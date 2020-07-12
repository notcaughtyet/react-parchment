import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
    
  
    document.addEventListener('mouseup', checkForSelection);
  
    let textBeingDragged;
    let originalNode
  
    function checkForSelection(event) {
      const selection = window.getSelection();
      console.log(selection)
      const selectedText = selection.toString();
      console.log(selectedText)
      if (selectedText) {
        originalNode = selection.anchorNode.parentNode;
        textBeingDragged = selectedText;
        document.addEventListener('dragend', handleDragEnd);
      }
    }
    
    function handleDragEnd(event) {
      const charRange = getCharPosition(event);
      const elemDrugOver = charRange.endContainer;
      if (elemDrugOver.nodeType === 3) {
        const offset = charRange.startOffset;
        const startText = elemDrugOver.wholeText.slice(0, offset);
        const endText = elemDrugOver.wholeText.slice(offset);
        elemDrugOver.textContent = `${startText}${textBeingDragged}${endText}`;
        
        const origText = originalNode.textContent;
        const indexOfSelection = origText.indexOf(textBeingDragged);
        const origStartText = origText.slice(0, indexOfSelection);
        const origEndText = origText.slice(offset + textBeingDragged.length);
        originalNode.textContent = `${origStartText}${origEndText}`;
  
        textBeingDragged = undefined;
        originalNode = undefined;
      }
      document.removeEventListener('dragend', handleDragEnd);
    }
    
    function getCharPosition(event) {
      if (document.caretPositionFromPoint) {
        return document.caretPositionFromPoint(event.clientX, event.clientY);
      } else if (document.caretRangeFromPoint) {
        return document.caretRangeFromPoint(event.clientX, event.clientY);
      }
      return false;
    }
    
  const divs = []
  
  for (let i = 0; i <= 8000; i++) {
      divs.push(<div className="square"></div>)
  }
    
  return (
    <div className="App">
      <div className="squareContainer">
        {divs}
      </div>
      
      <div>hello</div>
      <p>h</p>
      <p>e</p>
      <p>llo</p>
    </div>
  );
}

export default App;
