import React,{ useState } from 'react';

// styling
import './Board.css';
import Pawn from '../pieces/Pawn';

const Board = () => {
    // boolean if white's turn
    const [whTurn, setWhTurn] = useState(true)

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

    const resetBoard = () => {
        setBoard(
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
    }


    // takes array or arrays like board, returns that array clearing all 'av'
    const clearAv = arr => {
        const clearBoard = arr.map(row =>{
            return row.map(sq => {
                if (sq==="av") return null
                return sq
            })
        })
        return clearBoard
    }

    // highlight white pieces to see moves
    const wSelectPiece = num => {
        // return if it's not white turn
        if (!whTurn) return
        // copy board and clear av markers
        const updateBoard = [...clearAv(board)]
        let startRow = Math.floor(num / 8)
        const twoSpace = updateBoard[startRow - 2][num % 8]
        const oneSpace = updateBoard[startRow - 1][num % 8]

        // first pawn move gives two spaces
        if (num > 47 && !twoSpace) updateBoard[startRow - 2][num % 8] = "av"
        // first space available to move
        if (!oneSpace) updateBoard[startRow - 1][num % 8] = "av"
        setBoard(updateBoard)        
    }

    // highlight black pieces to see moves
    const bSelectPiece = num => {
        // return if it's not black turn
        if (whTurn) return
        // copy board and clear av markers
        const updateBoard = [...clearAv(board)]
        let startRow = Math.floor(num / 8)
        const twoSpace = updateBoard[startRow + 2][num % 8]
        const oneSpace = updateBoard[startRow + 1][num % 8]
        // first pawn move gives two spaces
        if (num < 16 && !twoSpace) updateBoard[startRow + 2][num % 8] = "av"
        // first space available to move
        if (!oneSpace) updateBoard[startRow + 1][num % 8] = "av"
        setBoard(updateBoard)  
    }

    const movePiece = num => {
        console.log(num)

        const clearBoard = [...clearAv(board)]
        setBoard(clearBoard)
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
                        <div key={sqNum} 
                            className={"square " + sqColor}
                            onClick={()=>wSelectPiece(sqNum)}>
                            <Pawn color="wh"/>
                        </div>
                    )
                }
                // if black pawn
                if (sq === "bp") {
                    let sqNum = innerCount()
                    return (
                        <div key={sqNum}
                            className={"square " + sqColor} 
                            onClick={()=>bSelectPiece(sqNum)}>
                            <Pawn color="bl"/>
                        </div>
                    )
                }
                
                if (sq === "av") {
                    let sqNum = innerCount()
                    return(
                        <div key={sqCount}
                            className={"square " + sqColor} 
                            onClick={() => movePiece(sqNum)}>
                            <div className="av-square cfb">
                                <div className="av-marker"></div>
                            </div>
                                
                        </div>
                    )

                }

                // check if squares available for move after click
                innerCount()
                return <div key={sqCount} className={"square "+ sqColor}></div>
        })})
        return renderBoard
    }


    return (
        <div>
            <div className="Board">
                <div className="board-content">
                    {renderGame()}
                </div>
            </div>
            <div>Turn: {whTurn ? "White" : "Black"}</div>
            <button onClick={resetBoard}> reset board </button>
        </div>
        // TODO add info container to display turn and instructions
    );
}

export default Board;


// PSEUDO CODE: 

// X  clicking on piece shows available moves, 
// edits board array changing null to "av" for available
// those become highlighted divs
// re render if "av" squares get onclick to move pieces
// send if that gets clicked, send coordinates to end turn, update pawns on board
// X reset button renders new board
