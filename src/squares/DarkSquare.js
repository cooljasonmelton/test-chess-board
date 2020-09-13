import React, {useState} from 'react';
// styling
import './Square.css';
import Pawn from '../pieces/Pawn'

const DarkSquare = () => {
  const [pawn, setPawn] = useState(false)
  return (
    <div className="DarkSquare" onClick={()=> setPawn(!pawn)}>    
      {pawn && <Pawn color={"white-piece"}/>}
    </div>
  );
}

export default DarkSquare;
