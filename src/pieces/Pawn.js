import React from 'react';

// styling
import './Pawn.css';

const Pawn = props => {
  const {color} = props
  return (
    <div className="Pawn ">
        <div className={"pawn-head " + color}></div>
        <div className={"pawn-middle " + color}></div>
        <div className={"pawn-base " + color}></div>
    </div>
  );
}

export default Pawn;
