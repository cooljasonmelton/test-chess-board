import React,{ useState } from 'react';

// styling
import './Board.css';

// components
import Pawn from '../pieces/Pawn';

const Board = () => {
    // boolean if white's turn
    const [whTurn, setWhTurn] = useState(true)

    // currently selected piece
    const [currPiece, setCurrPiece] = useState(null)

    // if move two space records num for to check for en passant
    const [enPassant, setEnPassant] = useState(null)

    // hold pieces' position
    // bp = black pawn; wp = white pawn; 
    // av = available move; 
    // wpav = capurable wp; bpav = capturable bp
    // wpep = en passant white pawn; bpep = en passant black pawn
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
        setWhTurn(true)
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

    // clear board of all 'av'
    const clearAv = arr => {
        const clearBoard = arr.map(row =>{
            return row.map(sq => {
                // clear move avs
                if (sq==="av") return null
                return sq
            })
        })
        return clearBoard
    }

    // clears board of bpav or wpav 
    const clearCapAv = arr => {
        const clearBoard = arr.map(row =>{
            return row.map(sq => {
                if (sq && sq.substring(2,4) === "ep") return null
                if (sq && sq.substring(2,4) === "av") return sq.substring(0,2)
                return sq
            })
        })
        return clearBoard
    }

    // highlight white pieces to see moves
    const wSelectPiece = num => {
        // return if it's not white turn
        if (!whTurn) return

        // save current piece to state
        setCurrPiece(num)
        const startRow = Math.floor(num / 8)

        // copy board and clear av markers
        const updateBoard = [...clearAv(clearCapAv(board))]

        // move one squares
        const oneSpace = updateBoard[startRow - 1][num % 8]

        // capture squares
        const capRight = updateBoard[startRow - 1][(num % 8) + 1]
        const capLeft = updateBoard[startRow - 1][(num % 8) - 1]

        // en passant av
        if ((num + 1) === enPassant) updateBoard[startRow - 1][(num % 8) + 1] = "bpep"
        if ((num - 1) === enPassant) updateBoard[startRow - 1][(num % 8) - 1] = "bpep"

        // capture available
        if (capRight === "bp") updateBoard[startRow - 1][(num % 8) + 1] = ("bpav")
        if (capLeft === "bp") updateBoard[startRow - 1][(num % 8) - 1] = ("bpav")
        
        // first pawn can move two spaces
        if (num > 47 && !updateBoard[startRow - 2][num % 8] && !oneSpace) updateBoard[startRow - 2][num % 8] = "av"
   
        // first space available to move
        if (!oneSpace) updateBoard[startRow - 1][num % 8] = "av"
        setBoard(updateBoard)        
    }

    // highlight black pieces to see moves
    const bSelectPiece = num => {
        // return if it's not black turn
        if (whTurn) return

        // save current piece to state
        setCurrPiece(num)
        
        // copy board and clear av markers
        const updateBoard = [...clearAv(clearCapAv(board))]
        const startRow = Math.floor(num / 8)

        // move squares
        const oneSpace = updateBoard[startRow + 1][num % 8]

        // capture squares
        const capRight = updateBoard[startRow + 1][(num % 8) + 1]
        const capLeft = updateBoard[startRow + 1][(num % 8) - 1]

        // capture available
        if (capRight === "wp") updateBoard[startRow + 1][(num % 8) + 1] =  ("wpav")
        if (capLeft === "wp") updateBoard[startRow + 1][(num % 8) - 1] =  ("wpav")

        // first pawn move gives two spaces
        if (num < 16 && !updateBoard[startRow + 2][num % 8] && !oneSpace) updateBoard[startRow + 2][num % 8] = "av"
  
        // first space available to move
        if (!oneSpace) updateBoard[startRow + 1][num % 8] = "av"
        setBoard(updateBoard)  
    }

    const movePiece = num => {
        // copy and clear av 
        const clearBoard = [...clearAv(board)]
        const startRow = Math.floor(currPiece / 8)
        const endRow = Math.floor(num / 8)
        const endSq = clearBoard[endRow][num % 8]



        // edit board for piece moving or capturing
        if (!endSq || (endSq === "wpav") || (endSq === "bpav")) {
            clearBoard[startRow][currPiece % 8] = null
            if (whTurn) clearBoard[endRow][num % 8] = "wp"
            if (!whTurn) clearBoard[endRow][num % 8] = "bp"
        }


        // update board clear of capture / en passant avs
        setBoard(clearCapAv(clearBoard))

        // is en passant available to opp?
        const moveTwoSpace = (currPiece - num) === 16 || (currPiece - num) === -16
        if (moveTwoSpace) setEnPassant(num)
        // change turn
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
                        <div key={sqCount} 
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
                        <div key={sqCount}
                            className={"square " + sqColor} 
                            onClick={()=>bSelectPiece(sqNum)}>
                            <Pawn color="bl"/>
                        </div>
                    )
                }

                if (sq === "wpav" || sq === "bpav") {
                    let sqNum = innerCount()
                    return(
                        <div key={sqCount}
                            className={"square " + sqColor} 
                            onClick={()=>movePiece(sqNum)}>
                            <Pawn color="gr"/>
                        </div>
                    )
                }
                
                if (sq === "av" || sq === "wpep" || sq === "bpep") {
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