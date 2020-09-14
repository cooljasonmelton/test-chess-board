import React,{ useState } from 'react';

// styling
import './Board.css';
import Pawn from '../pieces/Pawn';

const Board = () => {
    // hold pieces' position
    const [board, setBoard] = useState(
        [
            [null, null, null, null, null, null, null, null],
            ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
            [null, null, null, null, null, null, null, null]
        ]
    )
    
    const renderGame = () => {
        let rowCount = 0
        let sqCount = 0
        const renderBoard = board.map(row => {
            rowCount++
            return row.map(sq=> {  
                let sqColor = sqCount % 2 === 0 ? "bl" : "wh"
                if (rowCount % 2 === 0) sqColor = sqCount % 2 === 0 ? "wh" : "bl"        
                sqCount++      
                if (sq === "wp") return <div className={"square " + sqColor}><Pawn color="wh"/></div>
                if (sq === "bp") return <div className={"square " + sqColor}><Pawn color="bl"/></div>
                return <div className={"square "+ sqColor}></div>
        })})

        return renderBoard
    }





    // controls turn
    const [turn, setTurn] = useState('White')
    
    return (
        <div className="Board">
            <div className="board-content">
                {renderGame()}

            </div>
        </div>
        // add stats container to display turn and info
    );
}

export default Board;
