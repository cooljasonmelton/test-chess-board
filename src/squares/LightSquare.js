import React from 'react';

// styling
import './Square.css';
import Pawn from '../pieces/Pawn';

const LightSquare = () => {
  return (
    <div className="LightSquare square">
      <Pawn color={"white-piece"}/>
    </div>
  );
}

export default LightSquare;
