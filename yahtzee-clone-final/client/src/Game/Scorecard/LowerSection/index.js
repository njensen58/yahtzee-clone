import React from 'react';
import Section from './Section';
import YahtzeeBonus from './YahtzeeBonus';
import { connect } from 'react-redux';
import { updateScorecard, updateYahtzeeBonus } from '../../../redux/scorecard';
import { isDoneSelecting } from '../../../redux/controls';
import { updateGameControl} from '../../../redux/gamecontrol';




class LowerSection extends React.Component {
    constructor(){
        super();
        this.state = {
            threeOfAKind: 0,
            fourOfAKind: 0,
            fullHouse: 0,
            smallStraight: 0,
            largeStraight: 0,
            yahtzee: 0,
            chance: 0,
            yahtzeeBonus: 0
        }
        this.calculate3OfAKind = this.calculate3OfAKind.bind(this);
        this.calculate4OfAKind = this.calculate4OfAKind.bind(this);
        this.calculateFullHouse = this.calculateFullHouse.bind(this);
        this.calculateSmallStraight = this.calculateSmallStraight.bind(this);
        this.calculateLargeStraight = this.calculateLargeStraight.bind(this);
        this.calculateYahtzee = this.calculateYahtzee.bind(this);
        this.calculateChance = this.calculateChance.bind(this);
        this.calculateYahtzeeBonus = this.calculateYahtzeeBonus.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    componentWillReceiveProps(){
        if(this.props.controls.shouldReset){
            this.setState({
                threeOfAKind: 0,
                fourOfAKind: 0,
                fullHouse: 0,
                smallStraight: 0,
                largeStraight: 0,
                yahtzee: 0,
                chance: 0,
                yahtzeeBonus: 0
            })
        }
    }


    calculate3OfAKind(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums
                .reduce((myObj, num) => {
                    myObj[num]+=1;
                    return myObj
                },{1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
            let threes = 0;
            for(let key in value){
                if(value[key] >= 3){
                    threes = key
                }
            }
            let finalNum = threes * 3;
            this.setState({
                threeOfAKind: finalNum
            })
        } else {
            this.setState({
                threeOfAKind: 0
            })
        }
    }


    calculate4OfAKind(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums
                .reduce((myObj, num) => {
                    myObj[num]+=1;
                    return myObj;
                },{1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
            let fours = 0;
            for(let key in value){
                if(value[key] >= 4){
                    fours = key
                }
            }
            let finalNum = fours * 4;
            this.setState({
                fourOfAKind: finalNum
            })
        } else {
            this.setState({
                fourOfAKind: 0
            })
        }
    }

    calculateFullHouse(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums
                .reduce((myObj, num) => {
                    myObj[num]+=1;
                    return myObj;
                },{1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
            let twos = 0;
            let threes = 0;
            for(let key in value){
                if(value[key] === 3){threes = key}
                if(value[key] === 2){twos = key}
            }
            if(threes > 0 && twos > 0){
                this.setState({
                    fullHouse: 25
                })
            }
        }
    }

    calculateSmallStraight(){
        if(this.props.currentNums.length > 0){
            const sorted = this.props.currentNums.sort((a, b) => a > b);
            const noDups = sorted.reduce((finalArr, num) => {
                if(!finalArr.includes(num)){
                    finalArr.push(num)
                }
                return finalArr;
            },[])
            let count = 0;
            for(let i = 1; i < noDups.length; i++){
                if(noDups[i + 1] === noDups[i] + 1 && noDups[i - 1] === noDups[i] - 1){
                    count++;
                }
            }
            if(count >= 2){
                this.setState({
                    smallStraight: 30
                })
            }
        }
    }

    calculateLargeStraight(){
        if(this.props.currentNums.length > 0){
            const sorted = this.props.currentNums.sort((a, b) => a > b);
            const noDups = sorted.reduce((finalArr, num) => {
                if(!finalArr.includes(num)){
                    finalArr.push(num);
                }
                return finalArr;
            }, [])
            let count = 0;
            for(let i = 0; i < noDups.length; i++){
                if(noDups[i + 1] === noDups[i] + 1 && noDups[i - 1] === noDups[i] - 1){
                    count++;
                }
            }
            if(count === 3){
                this.setState({
                    largeStraight: 40
                })
            }
        }
    }

    calculateYahtzee(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums
                .reduce((myObj, num) => {
                    myObj[num]+=1;
                    return myObj;
                },{1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
            let yahtzee = 0;
            for(let key in value){
                if(value[key] === 5){
                    yahtzee = key
                }
            }
            if(yahtzee > 0 && this.props.gamecontrol.yahtzee === false){
                this.setState({
                    yahtzee: 50
                })
            }
        }
    }

    calculateChance(){
        if(this.props.currentNums.length > 0){
            const value = this.props.currentNums.reduce((final, num) => final += num, 0);
            this.setState({
                chance: value
            })
        }
    }

    calculateYahtzeeBonus(){
        console.log(this.state.yahtzeeBonus)
        if(this.props.currentNums.length > 0){
            if(this.props.gamecontrol.yahtzee === true){
                const value = this.props.currentNums
                    .reduce((myObj, num) => {
                        myObj[num]+=1;
                        return myObj;
                    },{1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
                let yahtzee = 0;
                for(let key in value){
                    if(value[key] === 5){
                        yahtzee = key
                    }
                }
                if(yahtzee > 0){
                    this.setState(prevState => ({
                        yahtzeeBonus: 100
                    }))
                }
            }
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

        const bonusTotal = score.yahtzeeBonus.length > 0 ?
            score.yahtzeeBonus.reduce((total, num) => total+=num, 0) : 0

        const totalScore = score.threeOfAKind + score.fourOfAKind + score.fullHouse + score.smallStraight + score.largeStraight + score.yahtzee + score.chance + bonusTotal;

        const totalDisplay = {
            width: this.state.isSelected ? '45px' : '75px',
            height: '100%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: '3px',
            borderBottomRightRadius: '3px',
            backgroundColor: totalScore < 1 ? '#D5DEDC' : 'darkslategrey',
            color: totalScore < 1 ? '#3337' : 'white'
        }


        return (
            <div className="lowerSectionContainer">
                <div>
                    <Section
                        section="threeOfAKind"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculate3OfAKind}
                        updateScore={this.updateScore}
                        value={this.state.threeOfAKind}
                        confirmedValue={this.props.scorecard.threeOfAKind}
                    />
                    <h3>3 Of A Kind</h3>
                </div>
                <div>
                    <Section
                        section="fourOfAKind"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculate4OfAKind}
                        updateScore={this.updateScore}
                        value={this.state.fourOfAKind}
                        confirmedValue={this.props.scorecard.fourOfAKind}
                    />
                    <h3>4 Of A Kind</h3>
                </div>
                <div>
                    <Section
                        section="fullHouse"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateFullHouse}
                        updateScore={this.updateScore}
                        value={this.state.fullHouse}
                        confirmedValue={this.props.scorecard.fullHouse}
                    />
                    <h3>Full House</h3>
                </div>
                <div>
                    <Section
                        section="smallStraight"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateSmallStraight}
                        updateScore={this.updateScore}
                        value={this.state.smallStraight}
                        confirmedValue={this.props.scorecard.smallStraight}
                    />
                    <h3>Small Straight</h3>
                </div>
                <div>
                    <Section
                        section="largeStraight"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateLargeStraight}
                        updateScore={this.updateScore}
                        value={this.state.largeStraight}
                        confirmedValue={this.props.scorecard.largeStraight}
                    />
                    <h3>Large Straight</h3>
                </div>
                <div>
                    <Section
                        section="yahtzee"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateYahtzee}
                        updateScore={this.updateScore}
                        value={this.state.yahtzee}
                        confirmedValue={this.props.scorecard.yahtzee}
                    />
                    <h3>Yahtzee</h3>
                </div>
                <div>
                    <Section
                        section="chance"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateChance}
                        updateScore={this.updateScore}
                        value={this.state.chance}
                        confirmedValue={this.props.scorecard.chance}
                    />
                    <h3>Chance</h3>
                </div>
                <div>
                    <YahtzeeBonus
                        section="yahtzeeBonus"
                        currentNums={this.props.currentNums}
                        calculateValue={this.calculateYahtzeeBonus}
                        value={this.state.yahtzeeBonus}
                        confirmedValue={bonusTotal}
                        resetCurrentNums={this.props.resetCurrentNums}
                    />
                    <h3>Yahtzee Bonus</h3>
                </div>
                <div>
                    <div>
                    {totalScore < 1 ?
                        <div style={totalDisplay}>

                        </div>
                    :
                        <div style={totalDisplay}>
                            {totalScore}
                        </div>
                    }
                    </div>
                    <h3>Lower Total</h3>
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {
    updateScorecard,
    isDoneSelecting,
    updateYahtzeeBonus,
    updateGameControl
})(LowerSection);
