import React from 'react';


function Highscore(props){
    return (
        <div className="highscoreDiv">
            <h1>{props.name}</h1>
            <h2>{props.score}</h2>
        </div>
    )
}

export default Highscore;
