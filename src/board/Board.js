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

    // hold pieces' position
    // bp = black pawn; wp = white pawn; 
    // av = available move; wpav = capurable wp; bpav = capturable bp
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

        // copy board and clear av markers
        const updateBoard = [...clearAv(clearCapAv(board))]
        const startRow = Math.floor(num / 8)

        // move squares
        const twoSpace = updateBoard[startRow - 2][num % 8]
        const oneSpace = updateBoard[startRow - 1][num % 8]

        // capture squares
        const capRight = updateBoard[startRow - 1][(num % 8) - 1]
        const capLeft = updateBoard[startRow - 1][(num % 8) + 1]

        // capture available
        if (capRight === "bp") updateBoard[startRow - 1][(num % 8) - 1] =  ("bp" + "av")
        if (capLeft === "bp") updateBoard[startRow - 1][(num % 8) + 1] =  ("bp" + "av")
        
        // first pawn move gives two spaces
        if (num > 47 && !twoSpace && !oneSpace) updateBoard[startRow - 2][num % 8] = "av"
   
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
        const twoSpace = updateBoard[startRow + 2][num % 8]
        const oneSpace = updateBoard[startRow + 1][num % 8]

        // capture squares
        const capRight = updateBoard[startRow + 1][(num % 8) - 1]
        const capLeft = updateBoard[startRow + 1][(num % 8) + 1]

        // capture available
        if (capRight === "wp") updateBoard[startRow + 1][(num % 8) - 1] =  ("wp" + "av")
        if (capLeft === "wp") updateBoard[startRow + 1][(num % 8) + 1] =  ("wp" + "av")

        // first pawn move gives two spaces
        if (num < 16 && !twoSpace && !oneSpace) updateBoard[startRow + 2][num % 8] = "av"
  
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
        if (!endSq || (endSq === "wpav") || (endSq === "bpav")) {
            clearBoard[startRow][currPiece % 8] = null
            if (whTurn) clearBoard[endRow][num % 8] = "wp"
            if (!whTurn) clearBoard[endRow][num % 8] = "bp"
        }

        
  
        setBoard(clearCapAv(clearBoard))
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

    console.log(board)

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
