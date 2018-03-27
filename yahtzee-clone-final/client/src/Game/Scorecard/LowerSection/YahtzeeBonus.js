import React from 'react';
import { connect } from 'react-redux';
import { disallowSelection } from '../../../redux/controls'
import { isDoneSelecting } from '../../../redux/controls';
import { updateYahtzeeBonus } from '../../../redux/scorecard';
import FaChecked from 'react-icons/lib/fa/check-circle';


class YahtzeeBonus extends React.Component{
    constructor(){
        super();
        this.state = {
            isSelected: false
        }
        this.handleSelected = this.handleSelected.bind(this);
        this.updateYahtzeeBonusScore = this.updateYahtzeeBonusScore.bind(this);
    }

    componentWillReceiveProps(){
        if(!this.props.controls.allowSelection && this.state.isSelected){
            this.setState({
                isSelected: false
            })
        }
    }

    handleSelected(){
    if(this.props.controls.allowSelection && this.props.scorecard.yahtzee > 0){
        if(this.props.value > 0){
            this.setState(prevState => ({
                isSelected: !prevState.isSelected ? true : false
            }))
        }
            this.props.calculateValue();
        }
    }



    updateYahtzeeBonusScore(){
        this.setState({
            isSelected: false
        })
        this.props.disallowSelection();
        this.props.updateYahtzeeBonus(this.props.value);
        this.props.resetCurrentNums();
        this.props.isDoneSelecting();
    }

    render(){
        const selected = {
            backgroundColor: this.state.isSelected ? '#97AABD' : '#D5DEDC',
            width: this.state.isSelected ? '45px' : '75px',
            height: '100%',
            borderRight: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: '3px',
            borderBottomRightRadius: '3px',
        }

        const confirmed = {
            width: '75px',
            height: '100%',
            borderRight: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: '3px',
            borderBottomRightRadius: '3px',
            backgroundColor: 'darkslategrey',
            color: 'white'
        }


        const totalBonus = this.props.confirmedValue;

        const preview = totalBonus + 100;

        return (
                <div className="yahtzeeBonusdisplay">
                    <div style={selected} onClick={this.handleSelected}>
                    {this.state.isSelected && this.props.value > 0 ?
                        <div>
                            {this.props.scorecard.yahtzeeBonus.length > 0 ?
                                <span>{preview}</span>
                            :
                                 <span>{this.props.value}</span>
                            }
                        </div>
                    :
                        <div>
                            {/*this displays total bonus added together*/}
                            {totalBonus > 0 ? <span>{totalBonus}</span> : ''}
                        </div>
                    }
                    </div>
                    {this.state.isSelected ?
                        <div className="lowerSaveBtnDiv">
                            <button onClick={this.updateYahtzeeBonusScore}><i className="icon"><FaChecked /></i></button>
                        </div>
                    :
                        <div>
                            <span></span>
                        </div>
                    }
                </div>
        )
    }
}

export default connect(state=>state, { disallowSelection, updateYahtzeeBonus, isDoneSelecting })(YahtzeeBonus);
