import React,{ useState } from 'react';

// styling
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState(
        [
            ["", "", "", "", "", "", "", ""],
            ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
            ["", "", "", "", "", "", "", ""]
        ]
    )

    return (
        <div className="Board">

        </div>
    );
}

export default Board;
