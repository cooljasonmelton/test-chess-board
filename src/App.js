import React from 'react';
// styling
import './App.css';

// components
import Board from './board/Board';
import Pawn from './pieces/Pawn';

const App = () => {

  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
