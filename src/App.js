import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
    useEffect(() => {
      console.log('useffecting')
    })
  
    const [textBox1, setTextBox1] = useState(<div className="testDiv" style={{display: "hidden"}} ></div>)
  
    document.addEventListener('mouseup', checkForSelection);
  
    
    // let textBox = <div className="testDiv" style={{display: "hidden"}} ></div>

    
    function newText(e) {
      e.preventDefault()
      
      var posX = e.clientX;
      var posY = e.clientY;
      
      console.log('double click')
      console.log(posX, posY)
      
      setTextBox1(<input className="mainInput" autoFocus="autofocus" onFocus={handleFocus} style={{left: posX - 3, top: posY - 11}}></input>)
    }
    
    
    const handleFocus = (event) => event.target.select();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
    

    
  return (
    <div className="App" onDoubleClick={newText}>
      {textBox1}
      <div>hello</div>
      <p>h</p>
      <p>e</p>
      <p>llo</p>
    </div>
  );
}

export default App;


// const divs = []
  
// for (let i = 0; i <= 8000; i++) {
//     divs.push(<div className="square"></div>)
// }