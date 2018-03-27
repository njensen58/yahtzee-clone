import React from 'react';
import Section from './Section';
import { connect } from 'react-redux';
import { updateScorecard } from '../../../redux/scorecard';
import { isDoneSelecting } from '../../../redux/controls';
import { updateGameControl} from '../../../redux/gamecontrol';


class UpperSection extends React.Component{
    constructor(){
        super();
        this.state = {
            onesValue: 0,
            twosValue: 0,
            threesValue: 0,
            foursValue: 0,
            fivesValue: 0,
            sixesValue: 0
        }
        this.calculateOnesValue = this.calculateOnesValue.bind(this)
        this.calculateTwosValue = this.calculateTwosValue.bind(this)
        this.calculateThreesValue = this.calculateThreesValue.bind(this)
        this.calculateFoursValue = this.calculateFoursValue.bind(this)
        this.calculateFivesValue = this.calculateFivesValue.bind(this)
        this.calculateSixesValue = this.calculateSixesValue.bind(this)
        this.updateScore = this.updateScore.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem('scorecard')){
            const scoreCard = JSON.parse(sessionStorage.scorecard);
            const section = this.props.section;
        }
    }

    componentWillReceiveProps(){
        if(this.props.controls.shouldReset){
            this.setState({
                onesValue: 0,
                twosValue: 0,
                threesValue: 0,
                foursValue: 0,
                fivesValue: 0,
                sixesValue: 0
            })
        }
    }

    calculateOnesValue(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => num === 1 ? final += 1 : final, 0)
            this.setState({
                onesValue: value
            })
        }
    }

    calculateTwosValue(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => num === 2 ? final += 2 : final, 0)
            this.setState({
                twosValue: value
            })
        }
    }

    calculateThreesValue(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => num === 3 ? final += 3 : final, 0)
            this.setState({
                threesValue: value
            })
        }
    }

    calculateFoursValue(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => num === 4 ? final += 4 : final, 0)
            this.setState({
                foursValue: value
            })
        }
    }

    calculateFivesValue(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => num === 5 ? final += 5 : final, 0)
            this.setState({
                fivesValue: value
            })
        }
    }

    calculateSixesValue(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => num === 6 ? final += 6 : final, 0)
            this.setState({
                sixesValue: value
            })
        }
    }

    updateScore(value, section){
        this.props.updateScorecard(value, section);
        this.props.updateGameControl(section);
        this.props.resetCurrentNums();
        this.props.isDoneSelecting();
    }

    render(){

        const score = this.props.scorecard;
        const totalScore = score.ones + score.twos + score.threes + score.fours + score.fives + score.sixes;

        const totalDisplay = {
            width: '75px',
            height: '100%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            backgroundColor: totalScore < 1 ? '#D5DEDC' : 'darkslategrey',
            color: totalScore < 1 ? '#3337' : 'white'
        }

        const bonusDisplay = {
            width: '75px',
            height: '100%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            backgroundColor: totalScore >= 63 ? 'darkslategrey' : '#D5DEDC',
            color: totalScore >= 63 ? 'white' : '#3338'
        }

        return (
            <div className="upperSectionContainer">
                <div>
                    <h3>ones</h3>
                    <Section
                        section="ones"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateOnesValue}
                        value={this.state.onesValue}
                        updateScore={this.updateScore}
                        confirmedValue={this.props.scorecard.ones}
                    />
                </div>
                <div>
                    <h3>twos</h3>
                    <Section
                        section="twos"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateTwosValue}
                        value={this.state.twosValue}
                        updateScore={this.updateScore}
                        confirmedValue={this.props.scorecard.twos}
                    />
                </div>
                <div>
                    <h3>threes</h3>
                    <Section
                        section="threes"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateThreesValue}
                        value={this.state.threesValue}
                        updateScore={this.updateScore}
                        confirmedValue={this.props.scorecard.threes}
                    />
                </div>
                <div>
                    <h3>fours</h3>
                    <Section
                        section="fours"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateFoursValue}
                        value={this.state.foursValue}
                        updateScore={this.updateScore}
                        confirmedValue={this.props.scorecard.fours}
                    />
                </div>
                <div>
                    <h3>fives</h3>
                    <Section
                        section="fives"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateFivesValue}
                        value={this.state.fivesValue}
                        updateScore={this.updateScore}
                        confirmedValue={this.props.scorecard.fives}
                    />
                </div>
                <div>
                    <h3>sixes</h3>
                    <Section
                        section="sixes"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateSixesValue}
                        value={this.state.sixesValue}
                        updateScore={this.updateScore}
                        confirmedValue={this.props.scorecard.sixes}
                    />
                </div>
                <div className="bonusDisplayDiv">
                    <h3>BONUS</h3>
                    <div>
                        { totalScore >= 63 ?
                            <div style={bonusDisplay}>
                                <span>+35</span>
                            </div>
                        :
                            <div style={bonusDisplay}>
                                {/*Nothing*/}
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <h3>Upper Total</h3>
                    {totalScore < 1 ?
                    <div style={totalDisplay}>

                    </div>
                    :
                    <div>
                    { totalScore >= 63 ?
                        <div style={totalDisplay}>
                            {totalScore + 35}
                        </div>
                    :
                        <div style={totalDisplay}>
                            {totalScore}
                        </div>
                    }
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {
    updateScorecard,
    isDoneSelecting,
    updateGameControl
})(UpperSection);
