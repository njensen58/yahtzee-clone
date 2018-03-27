import React from 'react';
import { connect } from 'react-redux';



class Highscore extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            score: '',
            isEditing: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditToggle(){
        this.setState(prevState => ({
            isEditing: !prevState.isEditing ? true : false
        }))
    }

    handleEditSave(){
        const updatedScore = {
            name: this.state.name,
            score: this.state.score,
            _id: this.props._id
        }
        this.props.handleEditConfirm(updatedScore);
        this.setState({
            name: '',
            score: '',
            isEditing: false
        })
    }


    render(){
        return (
            <div className="adminHighscoreDiv">
                <div>
                    {!this.state.isEditing ?
                        <button
                            onClick={this.handleEditToggle}
                            className="adminToggleBtn"><i className="ion-toggle adminToggleIcon"></i>
                        </button>
                    :
                        <button
                            onClick={this.handleEditToggle}
                            className="adminToggleBtn"><i className="ion-toggle-filled adminToggleIcon"></i>
                        </button>
                    }
                </div>
                <div className="adminNameDiv">
                    {!this.state.isEditing ?
                        <h2>{this.props.name}</h2>
                    :
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Name"
                            className="adminNameInput"
                        />
                    }
                </div>
                <div className="adminScoreDiv">
                    {!this.state.isEditing ?
                        <h2>{this.props.score}</h2>
                    :
                        <div>
                            <input
                                type="text"
                                name="score"
                                value={this.state.score}
                                onChange={this.handleChange}
                                placeholder="Score"
                                className="adminScoreInput"
                            />
                            <button
                                className="confirmEditBtn"
                                onClick={this.handleEditSave}><i className="ion-checkmark-circled confirmEditIcon"></i>
                            </button>
                        </div>
                    }
                </div>
                <div className="trashIconDiv">
                    {!this.state.isEditing ?
                        ''
                    :
                    <button onClick={()=>this.props.handleDelete(this.props._id)}><i className="ion-trash-b trashIcon"></i></button>
                    }
                </div>
            </div>
        )
    }
}

export default connect(state=>state, { })(Highscore);
