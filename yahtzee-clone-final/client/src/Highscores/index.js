import React from 'react';
import Highscore from './Highscore';
import { connect } from 'react-redux';
import { getHigh } from '../redux/highscores';

class Highscores extends React.Component {
    constructor(){
        super();
        this.state = {
            highscores: []
        }
    }

    componentDidMount(){
        this.props.getHigh().then(() => {
            this.props.highscores.highscores.sort((a, b) => Number(b.score) - Number(a.score))
            this.setState({
                highscores: this.props.highscores.highscores
            })
        })
    }

    render(){

        const mappedScores = this.state.highscores.map(score => {
            return (
                <Highscore
                    key={score._id}
                    name={score.name}
                    score={score.score}
                />
            )
        })
        return (
            <div className="highscorePageContainer">
                <div className="followMeDiv">
                    <h3>-Follow me-</h3>
                    <div>
                        <a href="https://github.com/njensen58"><i className="ion-social-github socialIconG"></i></a>
                        <a href="https://linkedin.com/in/natej58"><i className="ion-social-linkedin socialIconL"></i></a>
                        <a href="https://www.instagram.com/nate.sj/"><i className="ion-social-instagram socialIconI"></i></a>
                    </div>
                </div>
                <div className="aboutDiv">
                    <h3>-About-</h3>
                    <p>
                        - Final Project by Nate Jensen @ V School.
                    </p>
                    <p>
                        - Front-end made with React & Redux & designed with CSS.
                    </p>
                    <p>
                        - Back-end made with Express & MongoDB w/Mongoose.
                    </p>
                </div>
                <div className="highscoreContainer">
                    <div className="highscoreTitle">
                        <h1>HIGHSCORES</h1>
                    </div>
                    {mappedScores}
                </div>
            </div>
        )
    }
}

export default connect(state=>state, { getHigh })(Highscores);
