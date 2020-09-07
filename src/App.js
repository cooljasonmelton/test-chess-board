import React from 'react';
// styling
import './App.css';

// components
import LightSquare from './squares/LightSquare';
import DarkSquare from './squares/DarkSquare';

const App = () => {
  const eightArr = [1,2,3,4,5,6,7,8];

  const renderOddRow = () => {
    return eightArr.map(n => {
      return(
        <>
          <LightSquare/>
          <DarkSquare/>
        </>
    )})
  }
  const renderEvenRow = () => {
    return eightArr.map(n => {
      return(
        <>
          <DarkSquare/>
          <LightSquare/>
        </>
    )})
  }

  const renderBoard = () => {
    return eightArr.map(n => {
      return (
        <>
          {renderEvenRow()}
          {renderOddRow()}
        </>
      )
    })
  }

  return (
    <div className="App">
      {renderBoard()}
   

    </div>
  );
}

export default App;
