import React from 'react';
import Die from './Die';
import { connect } from 'react-redux';
import { reset, undoReset, isSelecting, allowSelection } from '../../redux/controls';

class Diceboard extends React.Component {
    constructor(){
        super();
        this.state = {
            currentRoll: [],
            rollCount: 0,
            savedDie: []
        }
        this.handleRoll = this.handleRoll.bind(this);
        this.handleSaveNumChoice = this.handleSaveNumChoice.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleRoll(){
        if(this.props.controls.hasSelected){
            if(this.state.rollCount < 3 || this.state.savedDie.length < 5){
                if(this.props.controls.shouldReset){
                    this.props.undoReset();
                }
                let dice1 = Math.floor(Math.random() * 6 + 1)
                let dice2 = Math.floor(Math.random() * 6 + 1)
                let dice3 = Math.floor(Math.random() * 6 + 1)
                let dice4 = Math.floor(Math.random() * 6 + 1)
                let dice5 = Math.floor(Math.random() * 6 + 1)
                this.setState(prevState => ({
                    currentRoll: [dice1, dice2, dice3, dice4, dice5],
                    rollCount: prevState.rollCount + 1
                }))
            }
        }
    }

    handleSaveNumChoice(num){
        this.setState(prevState => ({
            savedDie: [...prevState.savedDie, num]
        }))
    }

    handleReset(){
        if(this.state.savedDie.length === 5){
            this.props.updateCurrentNums(this.state.savedDie)
            this.props.reset();
            this.props.isSelecting();
            this.props.allowSelection();
            this.setState({
                rollCount: 0,
                savedDie: [],
                currentRoll: []
            })
        }
    }


    render(){
        return (
            <div className="diceboardContainer">
                <div className="rollCountDiv">
                    <span>Roll: </span> <span>{this.state.rollCount}</span>
                </div>
                <div className="dieContainer">
                    <Die
                        num={this.state.currentRoll[0]}
                        info={this.state}
                        handleSaveNumChoice={this.handleSaveNumChoice}
                    />
                    <Die
                        num={this.state.currentRoll[1]}
                        info={this.state}
                        handleSaveNumChoice={this.handleSaveNumChoice}
                    />
                    <Die
                        num={this.state.currentRoll[2]}
                        info={this.state}
                        handleSaveNumChoice={this.handleSaveNumChoice}
                    />
                    <Die
                        num={this.state.currentRoll[3]}
                        info={this.state}
                        handleSaveNumChoice={this.handleSaveNumChoice}
                    />
                    <Die
                        num={this.state.currentRoll[4]}
                        info={this.state}
                        handleSaveNumChoice={this.handleSaveNumChoice}
                    />
                </div>

                {/*To have the dice sequence finish if all 5 have been saved*/}
                { this.state.rollCount !== 3 && this.state.savedDie.length < 5 ?
                <div>
                    <button onClick={this.handleRoll} className="rollBtn">
                        { this.state.rollCount < 1 ?
                            <span>New roll</span>
                        :
                            <span>Roll</span>
                        }
                    </button>
                </div>
                :
                <div className="rollBtnDiv">
                    <button onClick={this.handleReset} className="rollBtn">
                        Submit
                    </button>
                </div>
                }
            </div>
        )
    }
}

export default connect(state=>state, {
    reset,
    undoReset,
    isSelecting,
    allowSelection
})(Diceboard);
