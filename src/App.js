import React from 'react';
// styling
import './App.css';

// components
import LightSquare from './squares/LightSquare';
import DarkSquare from './squares/DarkSquare';

import Pawn from './pieces/Pawn'

const App = () => {
  const fourArr = [1,2,3,4];

  const renderOddRow = fourArr.map(n => [<LightSquare/>, <DarkSquare/>])
  
  const renderEvenRow = fourArr.map(n => [<DarkSquare/>,<LightSquare/>])

  const renderBoard = fourArr.map(n => [renderEvenRow, renderOddRow])
  
  return (
    <div className="App">
      <div className="board">
        {renderBoard}
      </div>

      <Pawn/>
    </div>
  );
}

export default App;
