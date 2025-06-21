let undoStack = [];
let redoStack = [];

function saveState() {
    // Serialize your current slide or editor state
    let state = JSON.stringify(getCurrentEditorState());
    undoStack.push(state);
    // Clear redoStack because new action invalidates redo history
    redoStack = [];
}



function getCurrentEditorState() {
    return {
        presentation: JSON.parse(JSON.stringify(presentation))  // deep copy
    };
}

function restoreEditorState(state) {
    presentation = state.presentation;
    updateSlideUI();
}





function applyAutoCrop(imageElement, cropOverlay) {
    const container = imageElement.parentElement;
    const containerRect = container.getBoundingClientRect();
    const cropRect = cropOverlay.getBoundingClientRect();

    const leftRatio = (cropRect.left - containerRect.left) / containerRect.width;
    const topRatio = (cropRect.top - containerRect.top) / containerRect.height;
    const widthRatio = cropRect.width / containerRect.width;
    const heightRatio = cropRect.height / containerRect.height;

    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;

    const sx = originalWidth * leftRatio;
    const sy = originalHeight * topRatio;
    const sw = originalWidth * widthRatio;
    const sh = originalHeight * heightRatio;

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageElement, sx, sy, sw, sh, 0, 0, sw, sh);

    const croppedDataUrl = canvas.toDataURL("image/png");
    imageElement.src = croppedDataUrl;

    cropOverlay.remove();

    // Optional: update model and re-render slide
    const elementId = parseInt(container.dataset.elementId);
    const element = presentation.slides[presentation.currentSlideIndex].elements.find(el => el.id === elementId);
    if (element) {
        element.content = croppedDataUrl;
        presentation.updateUI(); // Update the slide and thumbnails
    }
}



function enableImageCropping(imageElement) {
    const container = imageElement.parentElement;
    const containerRect = container.getBoundingClientRect();

    let croppingOverlay = document.createElement('div');
    croppingOverlay.className = 'crop-overlay';
    container.appendChild(croppingOverlay);

    const initialWidth = container.offsetWidth * 0.8;
    const initialHeight = container.offsetHeight * 0.8;

    croppingOverlay.style.width = `${initialWidth}px`;
    croppingOverlay.style.height = `${initialHeight}px`;
    croppingOverlay.style.left = `${(container.offsetWidth - initialWidth) / 2}px`;
    croppingOverlay.style.top = `${(container.offsetHeight - initialHeight) / 2}px`;

    const directions = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];
    directions.forEach(dir => {
        const handle = document.createElement('div');
        handle.className = `crop-handle crop-${dir}`;
        croppingOverlay.appendChild(handle);

        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startY = e.clientY;
            const startRect = croppingOverlay.getBoundingClientRect();

            function onMouseMove(ev) {
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;

                let newWidth = startRect.width;
                let newHeight = startRect.height;
                let newTop = startRect.top - containerRect.top;
                let newLeft = startRect.left - containerRect.left;

                if (dir.includes('e')) newWidth = Math.max(20, startRect.width + dx);
                if (dir.includes('s')) newHeight = Math.max(20, startRect.height + dy);
                if (dir.includes('w')) {
                    newWidth = Math.max(20, startRect.width - dx);
                    newLeft += dx;
                }
                if (dir.includes('n')) {
                    newHeight = Math.max(20, startRect.height - dy);
                    newTop += dy;
                }

                croppingOverlay.style.width = `${newWidth}px`;
                croppingOverlay.style.height = `${newHeight}px`;
                croppingOverlay.style.left = `${newLeft}px`;
                croppingOverlay.style.top = `${newTop}px`;
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                // Auto-apply crop after drag ends
                applyAutoCrop(imageElement, croppingOverlay);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
}

const themes = {
    default: {
        backgroundImage: 'none',
        backgroundColor: '#ffffff',
        textColor: '#000000'
    },
    geometric: {
        backgroundImage: 'url("src/components/Template 6-01.webp")',
        textColor: '#333333'
    },
    nature: {
        backgroundImage: 'url("src/components/BG 1.webp")',
        textColor: '#ffffff'
    },
    business: {
        backgroundImage: 'url("src/components/BG 2.webp")',
        textColor: 'blue'
    },
    minimal: {
        backgroundImage: 'url("src/components/Template 2-01.webp")',
        textColor: 'red'
    },
    technology: {
        backgroundImage: 'url("src/components/Template 3-01.webp")',
        textColor: '#ffffff'
    },
    gradient: {
        backgroundImage: 'url("src/components/Template 4-01.webp")',
        textColor: '#ffffff'
    }
};



// function applyThemeSafely(themeKey) {
//     const theme = themes[themeKey];
//     const img = new Image();
//     img.src = theme.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
  
//     img.onload = () => {
//       const slide = document.getElementById('currentSlide');
//       slide.style.backgroundImage = theme.backgroundImage;
//       slide.style.color = theme.textColor;
//     };
//   }
  