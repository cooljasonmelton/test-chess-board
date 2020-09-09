import React from 'react';
// styling
import './Square.css';
import Pawn from '../pieces/Pawn'

const DarkSquare = () => {
  return (
    <div className="DarkSquare square"> 
          <Pawn color={"black-piece"}/>
   
    </div>
  );
}

export default DarkSquare;
