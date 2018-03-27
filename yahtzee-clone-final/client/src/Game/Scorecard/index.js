import React from 'react';
import UpperSection from './UpperSection';
import LowerSection from './LowerSection';
import GameRules from './GameRules';

class Scorecard extends React.Component {
    constructor(){
        super();
        this.state = {
            isLearning: false
        }
        this.toggleIsLearning = this.toggleIsLearning.bind(this);
    }

    toggleIsLearning(){
        this.setState(prevState => ({
            isLearning: !prevState.isLearning ? true : false
        }))
    }

    render(){
        const howToPlay = {
            display: this.state.isLearning ? 'flex' : 'none',

        }

        return (
            <div className="scorecardContainer">
                <div className="howToPlayIcon" onClick={this.toggleIsLearning}>
                    <span><i className="ion-help-circled questionIcon"></i></span>
                </div>
                <div style={howToPlay} onClick={this.toggleIsLearning}>
                    <GameRules />
                </div>
                <div className="upperSectionDiv">
                    <UpperSection
                        currentNums={this.props.currentNums}
                        resetCurrentNums={this.props.resetCurrentNums}
                    />
                </div>
                <div className="lowerSectionDiv">
                    <LowerSection
                        currentNums={this.props.currentNums}
                        resetCurrentNums={this.props.resetCurrentNums}
                    />
                </div>
                <div className="yahtzeeTitleDiv">
                    <h1>YAHTZEE<span>.clone</span></h1>
                </div>
                <div className="totalScoreDiv">
                    <div>
                        <h3>Total Score</h3>
                    </div>
                    <div><span>{this.props.totalGameScore}</span></div>
                </div>
            </div>
        )
    }
}

export default Scorecard;
