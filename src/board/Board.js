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

    // sets if white's turn
    const [whTurn, setWhTurn] = useState(true)

    const selectPiece = num => {
        console.log(num)
    }
    
    const endTurn = () => {
        setWhTurn(!whTurn)
    }

    const renderGame = () => {
        let rowCount = 0;
        let sqCount = 0;
        // map board array of arrays
        const renderBoard = board.map(row => {
            rowCount++
            // map each row
            return row.map(sq=> {  
                // checkered squares
                let sqColor = sqCount % 2 === 0 ? "bl" : "wh"
                if (rowCount % 2 === 0) sqColor = sqCount % 2 === 0 ? "wh" : "bl"  
                
                // closure for counter so squares retain num for identifier
                let innerCount = () => sqCount++

                // if white pawn
                if (sq === "wp") {
                    let sqNum = innerCount()
                    return (
                        <div className={"square " + sqColor}
                            onClick={()=>selectPiece(sqNum)}>
                            <Pawn color="wh"/>
                        </div>
                    )
                }
                // if black pawn
                if (sq === "bp") {
                    let sqNum = innerCount()
                    return (
                        <div className={"square " + sqColor} 
                            onClick={()=>selectPiece(sqNum)}>
                            <Pawn color="bl"/>
                        </div>
                    )
                }
                innerCount()
                return <div className={"square "+ sqColor}></div>
        })})
        return renderBoard
    }


    return (
        <div className="Board">
            <div className="board-content">
                {renderGame()}
            </div>
        </div>
        // TODO add info container to display turn and instructions
    );
}

export default Board;
