import React from 'react';
import Scorecard from './Scorecard';
import Diceboard from './Diceboard';
import { connect } from 'react-redux';
import { addHighScore } from '../redux/highscores';
import { restartGame, updateCurrentGame } from '../redux/gamecontrol';
import { resetScorecard, updateScorecard  } from '../redux/scorecard';
import './gameStyle.css';


let totalGameScore = 0;

class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            currentNums: [],
            isGameComplete: false,
            name: ""
        }
        this.updateCurrentNums = this.updateCurrentNums.bind(this);
        this.resetCurrentNums = this.resetCurrentNums.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gameover = this.gameover.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem('scorecard')){
            if(sessionStorage.getItem('gamecontrol')){
                const currentScore = JSON.parse(sessionStorage.scorecard);
                const currentGame = JSON.parse(sessionStorage.gamecontrol);
                for(let key in currentScore){
                    this.props.updateScorecard(currentScore[key], key)
                }
                for(let key in currentGame){
                    this.props.updateCurrentGame(key, currentGame[key])
                }
            }
        }
    }

    updateCurrentNums(nums){
        this.setState({
            currentNums: [...nums]
        })
    }

    resetCurrentNums(){
        this.setState({
            currentNums: []
        })
    }

    handleChange(e){
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const newHighScore = {name: this.state.name, score: totalGameScore}
        this.props.addHighScore(newHighScore).then(() => {
            this.setState({
                isGameComplete: false
            }, () => {
                this.props.resetScorecard();
                this.props.restartGame();
            })
            this.props.history.push('/highscores');
        });
    }

    gameover(){
        const gameControl = this.props.gamecontrol;
        let count = 0;
        for(let key in gameControl){
            if(gameControl[key]){
                count++
            }
        }
        if(count === 13){
            this.setState({
                isGameComplete: true
            })
        }
        const s = this.props.scorecard;
        const b = s.yahtzeeBonus.length > 0 ? s.yahtzeeBonus.reduce((t, n) => t+=n,0) : 0;

        totalGameScore = s.ones + s.twos + s.threes + s.fours + s.fives + s.sixes + s.threeOfAKind + s.fourOfAKind + s.fullHouse + s.smallStraight + s.largeStraight + s.yahtzee + s.chance + b;
    }

    render(){
        if(this.state.isGameComplete === false){
            this.gameover();
        }

        return (
            <div className="gameContainer">
            { this.state.isGameComplete ?
                <div className="gameComplete">
                    <Scorecard
                        currentNums={this.state.currentNums}
                        resetCurrentNums={this.resetCurrentNums}
                    />
                    <div className="enterHighScoreDiv">
                        <h3>Score: {totalGameScore}</h3>
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    placeholder="Enter Name"
                                    value={this.state.name}
                                />
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            :
                <div className="gameInProgress">
                    <Scorecard
                        currentNums={this.state.currentNums}
                        resetCurrentNums={this.resetCurrentNums}
                        totalGameScore={totalGameScore}
                    />
                    <Diceboard
                        updateCurrentNums={this.updateCurrentNums}
                    />
                </div>
            }
            </div>
        )
    }
}

export default connect(state=>state, {
    addHighScore,
    restartGame,
    resetScorecard,
    updateScorecard,
    updateCurrentGame
})(Game);
