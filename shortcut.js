//   // ✅ Keyboard shortcuts for Ctrl+Z (undo) and Ctrl+Y (redo)
// document.addEventListener('keydown', (e) => {
//     // Don't handle shortcuts if user is editing text
//     if (e.target.contentEditable === 'true') return;

//     if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
//         e.preventDefault();
//         this.undo();
//     }
//     if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
//         e.preventDefault();
//         this.redo();
//     }
//     inside initKeyboardShortcuts ...
//           if (e.key === 'Delete' || e.key === 'Backspace') {
//             // Only handle delete if not editing text
//             // if (e.target.contentEditable !== 'true') {
//                 e.preventDefault();
//                 this.deleteElement();
//             }


//             // hide context menu on right click
//             initContextMenu() {
//     const contextMenu = document.createElement('div');
//     contextMenu.className = 'context-menu';
//     contextMenu.style.display = 'none';
//     document.body.appendChild(contextMenu);

//     document.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//         const currentSlide = document.getElementById('currentSlide');
//         if (!currentSlide) return;
        
//         const element = e.target.closest('.slide-element');
//         const isEmptyArea = e.target === currentSlide;
        
//         // Position menu at cursor
//         contextMenu.style.left = `${e.pageX}px`;
//         contextMenu.style.top = `${e.pageY}px`;
        
//         let menuItems = '';

//         if (element) {
//             // Get the element data using both possible attribute names
//             const elementId = element.dataset.elementId || element.dataset.id;
//             const elementData = this.slides[this.currentSlideIndex].elements
//                 .find(el => el.id.toString() === elementId);

//             if (!elementData) return;

//             // Store the element ID in the context menu for later use
//             contextMenu.dataset.elementId = elementId;

//             // Common menu items for all elements
//             menuItems = `
//                 <div class="context-menu-item" data-action="copy">
//                     <i class="fas fa-copy"></i> Copy (Ctrl+C)
//                 </div>
//                 <div class="context-menu-item" data-action="cut">
//                     <i class="fas fa-cut"></i> Cut (Ctrl+X)
//                 </div>
//                 <div class="context-menu-item" data-action="duplicate">
//                     <i class="fas fa-clone"></i> Duplicate
//                 </div>
//                 <div class="context-menu-separator"></div>
//                 <div class="context-menu-item" data-action="delete">
//                     <i class="fas fa-trash"></i> Delete
//                 </div>
//                 <div class="context-menu-separator"></div>
//             `;

//             // Add type-specific options
//             if (elementData.type === 'text') {
//                 menuItems += `
//                     <div class="context-menu-item" data-action="bold">
//                         <i class="fas fa-bold"></i> Bold
//                     </div>
//                     <div class="context-menu-item" data-action="italic">
//                         <i class="fas fa-italic"></i> Italic
//                     </div>
//                     <div class="context-menu-item" data-action="underline">
//                         <i class="fas fa-underline"></i> Underline
//                     </div>
//                     <div class="context-menu-separator"></div>
//                 `;
//             } else if (elementData.type === 'audio') {
//                 const isPlaying = element.querySelector('audio')?.paused === false;
//                 menuItems += `
//                     <div class="context-menu-item" data-action="${isPlaying ? 'pause-audio' : 'play-audio'}">
//                         <i class="fas fa-${isPlaying ? 'pause' : 'play'}"></i> ${isPlaying ? 'Pause' : 'Play'} Audio
//                     </div>
//                     <div class="context-menu-item" data-action="replace-audio">
//                         <i class="fas fa-exchange-alt"></i> Replace Audio
//                     </div>
//                     <div class="context-menu-separator"></div>
//                 `;
//             }

//             // Add link/unlink options
//             if (elementData.link) {
//                 menuItems += `
//                     <div class="context-menu-item" data-action="unlink">
//                         <i class="fas fa-unlink"></i> Remove Link
//                     </div>
//                 `;
//             } else {
//                 menuItems += `
//                     <div class="context-menu-item" data-action="addlink">
//                         <i class="fas fa-link"></i> Add Link
//                     </div>
//                 `;
//             }

//             menuItems += `
//                 <div class="context-menu-separator"></div>
//                 <div class="context-menu-item" data-action="bring-front">
//                     <i class="fas fa-level-up-alt"></i> Bring to Front
//                 </div>
//                 <div class="context-menu-item" data-action="send-back">
//                     <i class="fas fa-level-down-alt"></i> Send to Back
//                 </div>
//             `;

//         } else if (isEmptyArea) {
//             const copiedData = localStorage.getItem('copiedElement');

//             menuItems = `
//                 ${copiedData ? `
//                     <div class="context-menu-item" data-action="paste">
//                         <i class="fas fa-paste"></i> Paste (Ctrl+V)
//                     </div>
//                     <div class="context-menu-separator"></div>
//                 ` : ''}
//                 <div class="context-menu-item" data-action="addtext">
//                     <i class="fas fa-font"></i> Add Text
//                 </div>
//                 <div class="context-menu-item" data-action="addimage">
//                     <i class="fas fa-image"></i> Add Image
//                 </div>
//                 <div class="context-menu-item" data-action="addaudio">
//                     <i class="fas fa-music"></i> Add Audio
//                 </div>
//                 <div class="context-menu-item" data-action="addshape">
//                     <i class="fas fa-shapes"></i> Add Shape
//                 </div>
//                 <div class="context-menu-item" data-action="addtable">
//                     <i class="fas fa-table"></i> Add Table
//                 </div>
//             `;
//         }

//         menuItems += `
//             <div class="context-menu-separator"></div>
//             <div class="context-menu-item" data-action="properties">
//                 <i class="fas fa-cog"></i> Properties
//             </div>
//         `;

//         contextMenu.innerHTML = menuItems;
//         contextMenu.style.display = 'block';
//     });


// -----------------------------------------------------------------------------------------------------------------------
    // Handle context menu item clicks
//     contextMenu.addEventListener('click', (e) => {
//         const action = e.target.closest('.context-menu-item')?.dataset.action;
//         if (!action) return;

//         const elementId = contextMenu.dataset.elementId;
//         let element = null;
//         let elementDiv = null;

//         if (elementId) {
//             element = this.slides[this.currentSlideIndex].elements
//                 .find(el => el.id.toString() === elementId);

//             if (element) {
//                 this.selectedElement = element;
//                 this.selectedElementId = element.id;

//                 elementDiv = document.querySelector(`.slide-element[data-element-id="${elementId}"], .slide-element[data-id="${elementId}"]`);
//                 if (elementDiv) {
//                     document.querySelectorAll('.slide-element').forEach(el => el.classList.remove('selected'));
//                     elementDiv.classList.add('selected');
//                 }
//             }
//         }

//         switch(action) {
//             // Element actions
//             case 'copy':
//                 this.copyElement(element);
//                 break;
//             case 'cut':
//                 this.copyElement(element);
//                 this.deleteElement();
//                 break;
//             case 'paste':
//                 this.pasteElement();
//                 break;
//             case 'duplicate':
//                 this.duplicateElement();
//                 break;
//             case 'delete':
//                 this.deleteElement();
//                 break;
//             case 'unlink':
//                 this.removeLink();
//                 break;
//             case 'addlink':
//                 this.createLink();
//                 break;
//             case 'bring-front':
//                 this.moveElementUpward();
//                 break;
//             case 'send-back':
//                 this.moveElementDownward();
//                 break;
//             // Text formatting
//             case 'bold':
//                 this.formatText('bold');
//                 break;
//             case 'italic':
//                 this.formatText('italic');
//                 break;
//             case 'underline':
//                 this.formatText('underline');
//                 break;
//             // Audio controls
//             case 'play-audio':
//                 if (elementDiv) {
//                     const audio = elementDiv.querySelector('audio');
//                     if (audio) audio.play();
//                 }
//                 break;
//             case 'pause-audio':
//                 if (elementDiv) {
//                     const audio = elementDiv.querySelector('audio');
//                     if (audio) audio.pause();
//                 }
//                 break;
//             case 'replace-audio':
//                 if (element) this.replaceSelectedMedia('audio');
//                 break;
//             // Empty area actions
//             case 'addtext':
//                 this.addTextElement('click to edit', e.clientX, e.clientY);
//                 break;
//             case 'addimage':
//                 this.addImageElement();
//                 break;
//             case 'addaudio':
//                 this.addAudioElement();
//                 break;
//             case 'addshape':
//                 this.addShape('rectangle', e.clientX, e.clientY);
//                 break;
//             case 'addtable':
//                 this.addTableElement();
//                 break;
//             case 'properties':
//                 if (element) {
//                     this.showElementProperties(element);
//                 } else {
//                     this.showSlideProperties();
//                 }
//                 break;
//         }
        
//         contextMenu.style.display = 'none';
//     });

//     // Hide context menu when clicking outside
//     document.addEventListener('click', () => {
//         contextMenu.style.display = 'none';
//     });

//     // Hide context menu when scrolling
//     document.addEventListener('scroll', () => {
//         contextMenu.style.display = 'none';
//     });
//     // Hide context menu when typing (keyboard input)
// document.addEventListener('keydown', () => {
//     contextMenu.style.display = 'none';
// });

// // Hide context menu when user types in editable text
// document.addEventListener('input', () => {
//     contextMenu.style.display = 'none';
// });

// }




// ----------------------------------------------------------------------------------------------------------------

// add text in updateCurrentSlide
//   case 'text':
//                         elementDiv = document.createElement('div');
//                         elementDiv.className = 'slide-element text-element';
//                         elementDiv.dataset.elementId = element.id;
                    
//                         const textContainer = document.createElement('div');
//                         textContainer.className = 'text-content';
//                         textContainer.contentEditable = false;
                    
//                         const isTitle = element.content === 'Click to add title';
//                         const isSubtitle = element.content === 'Click to add subtitle';
//                         const isPlaceholder = !element.content || isTitle || isSubtitle || element.content === 'Click to add text';
                    
//                         // Show placeholder span
//                         if (isPlaceholder) {
//                             textContainer.innerHTML = `<span class="placeholder">${element.content}</span>`;
//                         } else {
//                             textContainer.innerHTML = element.content;
//                         }
                    
//                         elementDiv.appendChild(textContainer);
                    
//                         if (element.style) {
//                             Object.assign(textContainer.style, element.style);
//                             if (element.style.width) elementDiv.style.width = element.style.width;
//                             if (element.style.height) elementDiv.style.height = element.style.height;
//                         }
                    
//                         elementDiv.style.position = 'absolute';
//                         elementDiv.style.left = `${element.x}px`;
//                         elementDiv.style.top = `${element.y}px`;
//                         elementDiv.style.userSelect = 'none';
//                         elementDiv.style.cursor = 'move';
                    
//                         Object.assign(textContainer.style, {
//                             whiteSpace: 'pre-wrap',
// wordBreak: 'break-word',
// overflowWrap: 'break-word',
// overflow: 'hidden',
// textOverflow: 'ellipsis',
// display: 'block',
// resize: 'none',
// boxSizing: 'border-box',
// width: '100%',
// minHeight: '50px'

//                         });
                    
// // ✅ Resize box & shrink font if needed
// textContainer.addEventListener('input', () => {
//     const lineHeight = parseInt(getComputedStyle(textContainer).lineHeight || "24");
//     const maxHeight = 400; // max height before shrinking text
//     const minFontSize = 10;

//     // Expand the parent box
//     const contentHeight = textContainer.scrollHeight;
//     elementDiv.style.height = `${contentHeight}px`;

//     // Shrink font size if height exceeds max
//     const currentFontSize = parseFloat(getComputedStyle(textContainer).fontSize);
//     if (contentHeight > maxHeight && currentFontSize > minFontSize) {
//         const newFontSize = Math.max(minFontSize, currentFontSize - 1);
//         textContainer.style.fontSize = `${newFontSize}px`;
//     }

//     // Save updated height and font size to element model
//     element.style.fontSize = textContainer.style.fontSize;
//     element.style.height = `${elementDiv.offsetHeight}px`;
// });


//                         // ✅ PowerPoint-like click-to-edit
//                         textContainer.addEventListener('click', (e) => {
//                             e.stopPropagation();
//                     // ✅ Hide right-click menu
//     const menu = document.getElementById('customContextMenu');
//     if (menu) menu.style.display = 'none';

//     // ✅ Close any other open editable boxes
//     // document.querySelectorAll('.text-content[contenteditable="true"]').forEach(el => {
//     //     el.blur();
//     // });
//                             // Close others
//                             document.querySelectorAll('.text-content[contenteditable="true"]').forEach(el => {
//                                 el.blur();
//                             });
                    
//                             textContainer.contentEditable = true;
                    
//                             if (textContainer.querySelector('.placeholder')) {
//                                 textContainer.innerHTML = '';
//                             }
                    
//                             textContainer.focus();
//                         });
//                     // 🪄 Ensure text box grows to fit content
// setTimeout(() => {
//     const contentHeight = textContainer.scrollHeight;

//     // Auto-grow the outer container to fit full text
//     elementDiv.style.height = `${contentHeight}px`;

//     // Shrink font size if text still overflows
//     const maxHeight = 400;
//     const minFontSize = 10;
//     const currentFontSize = parseFloat(getComputedStyle(textContainer).fontSize);

//     if (contentHeight > maxHeight && currentFontSize > minFontSize) {
//         const newFontSize = Math.max(minFontSize, currentFontSize - 1);
//         textContainer.style.fontSize = `${newFontSize}px`;
//         element.style.fontSize = `${newFontSize}px`;
//     }

//     // Save back height for persistence
//     element.style.height = `${elementDiv.offsetHeight}px`;
// }, 0); 

//                         // ✅ Handle blur
//                         textContainer.addEventListener('blur', () => {
//                             textContainer.contentEditable = false;
//                             const value = textContainer.innerText.trim();
                    
//                             if (!value) {
//                                 let placeholder = 'Click to add text';
//                                 if (isTitle) placeholder = 'Click to add title';
//                                 if (isSubtitle) placeholder = 'Click to add subtitle';
//                                 textContainer.innerHTML = `<span class="placeholder">${placeholder}</span>`;
//                                 element.content = placeholder;
//                             } else {
//                                 element.content = value;
//                                 textContainer.innerHTML = value;
//                             }
                    
//                             // Save updated styles
//                             element.style = {
//                                 fontSize: textContainer.style.fontSize,
//                                 fontFamily: textContainer.style.fontFamily,
//                                 color: textContainer.style.color,
//                                 fontWeight: textContainer.style.fontWeight,
//                                 fontStyle: textContainer.style.fontStyle,
//                                 textDecoration: textContainer.style.textDecoration,
//                                 textAlign: textContainer.style.textAlign,
//                                 lineHeight: textContainer.style.lineHeight,
//                                 letterSpacing: textContainer.style.letterSpacing
//                             };
                    
//                             this.saveState();
//                             this.updateSlidesList?.(); // optional if needed
//                         });
                    
//                         textContainer.addEventListener('keydown', (e) => {
//                             const menu = document.getElementById('customContextMenu');
//     if (menu) menu.style.display = 'none';
//                             // Ctrl+Enter or Esc to finish editing
//                             if ((e.ctrlKey && e.key === 'Enter') || e.key === 'Escape') {
//                                 e.preventDefault();
//                                 textContainer.blur();
//                             }
//                         });
                        
                    
//                         // ✅ Selection + rotation
//                         elementDiv.addEventListener('click', (e) => {
//                             e.stopPropagation();
//                             document.querySelectorAll('.slide-element').forEach(el => el.classList.remove('selected'));
//                             elementDiv.classList.add('selected');
//                             this.makeElementRotatable(elementDiv);
//                         });
                    
//                         // ✅ Drag, resize, rotate
//                         this.makeElementDraggable(elementDiv);
//                         this.makeElementResizable(elementDiv);
                    
//                         if (elementDiv.classList.contains('selected')) {
//                             this.makeElementRotatable(elementDiv);
//                         }
                    
//                         this.currentSlideElement.appendChild(elementDiv);
//                         break;


// -------------------------------------------------------------------------------------------------------
// adding text or text elements
// addTextElement(content = 'Click to add text', x = 100, y = 100) {
//     console.log('Adding text element:', content, x, y);
//     this.saveState();

//     const element = {
//         type: 'text',
//         content: content,
//         x: x,
//         y: y,
//         style: {
//             fontSize: '16px',
//             fontFamily: 'Arial',
//             color: '#000000',
//             fontWeight: 'normal',
//             fontStyle: 'normal'
//         },
//         id: Date.now()
//     };
//  // ✅ Check for overflow
//  this.checkAndMoveOverflowingElements();
//     this.slides[this.currentSlideIndex].elements.push(element);
//     this.updateUI();
// }
// -------------------------------------------------------------------------------------------------------