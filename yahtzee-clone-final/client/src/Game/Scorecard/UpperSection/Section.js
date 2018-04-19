import React from 'react';
import { connect } from 'react-redux';
import { disallowSelection } from '../../../redux/controls';
import FaChecked from 'react-icons/lib/fa/check-circle';


class Section extends React.Component{
    constructor(){
        super();
        this.state = {
            isSelected: false,
            isConfirmed: false
        }
        this.handleSelected = this.handleSelected.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem('gamecontrol')){
            const currentGame = JSON.parse(sessionStorage.gamecontrol);
            const section = this.props.section;
            if(currentGame[section]){
                this.setState({
                    isConfirmed: true
                })
            }
        }
    }


    componentWillReceiveProps(){
        if(!this.props.allowSelection && this.state.isSelected){
            this.setState({
                isSelected: false
            })
        }
    }

    handleSelected(){
        if(this.props.controls.allowSelection){
            if(this.state.isConfirmed === false){
                this.props.calculateValue();
                this.setState(prevState => ({
                    isSelected: !prevState.isSelected ? true : false
                }))
            }
        }
    }

    handleConfirm(){
        if(this.state.isConfirmed === false){
            this.props.disallowSelection();
            this.setState({
                isConfirmed: true
            })
            this.props.updateScore(this.props.value, this.props.section)
        }
    }

    render(){
        const selected = {
            backgroundColor: this.state.isSelected && this.props.value > 0 ? '#97AABD' : '#D5DEDC',
            width: this.state.isSelected ? '45px' : '75px',
            height: '100%',
            borderLeft: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            transition: '.5s ease-out'
        }

        const confirmed = {
            width: '75px',
            height: '100%',
            borderLeft: '1px solid black',
            border: this.state.isConfirmed ? '2px solid black' : 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            backgroundColor: 'darkslategrey',
            color: 'white'
        }



        return (
            <div className="upperSectionButtonsContainer">
                {this.state.isConfirmed ?
                <div style={confirmed}>
                    <span>{this.props.confirmedValue}</span>
                </div>
                :
                    <div className="tileScreenExpand">
                        {this.state.isSelected && !this.state.isConfirmed ?
                        <div className="upperSaveBtnDiv">
                            <button onClick={this.handleConfirm}><i className="icon"><FaChecked /></i></button>
                        </div>
                        :
                        <div>
                            <span></span>
                        </div>
                        }
                        <div style={selected} onClick={this.handleSelected}>
                        {!this.state.isSelected ?
                            <div>
                            </div>
                        :
                            <div>
                                {this.props.value >= 0 ?
                                    <span>{this.props.value}</span>
                                :
                                    ''
                                }
                            </div>
                        }
                        </div>

                    </div>
                }
            </div>
        )
    }
}

export default connect(state=>state, { disallowSelection })(Section);
