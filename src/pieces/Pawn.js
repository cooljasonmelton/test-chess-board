import React from 'react';

// images 
import wPawn from './wpawn.png'
import bPawn from './bpawn.png'
import gPawn from './gpawn.png'


// styling
import './Pawn.css';

const Pawn = props => {
  const { color } = props

  return (
    <div className="Pawn">

      {color === "gr" ?
        <img src={gPawn} alt="green pawn" /> 
          : color === "wh" ? 
            <img src={wPawn} alt="white pawn" /> 
              : <img src={bPawn} alt="black pawn" />}
    </div>
  );
}

export default Pawn;
