import React from 'react';
import { connect } from 'react-redux';
import { getHigh, adminEditHighScore, adminDeleteHighScore } from '../redux/highscores';
import Highscore from './Highscore';
import Sidebar from './Sidebar';
import './adminStyles.css';


class Admin extends React.Component{
    constructor(){
        super();
        this.state = {
            highscores: [],
            showSidebar: false,
            nameQuery: '',
            scoreQuery: ''
        }
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.getHigh().then(() => {
            this.props.highscores.highscores.sort((a, b) => Number(b.score) - Number(a.score))
            this.setState({
                highscores: this.props.highscores.highscores
            })
        })
    }

    toggleSidebar(){
        this.setState(prevState => ({
            showSidebar: !prevState.showSidebar ? true : false
        }))
    }

    handleEditConfirm(item){
        this.props.adminEditHighScore(item).then(() => {
            this.props.highscores.highscores.sort((a, b) => Number(b.score) - Number(a.score))
            this.setState({
                highscores: this.props.highscores.highscores
            })
        })
    }

    handleDelete(id){
        this.props.adminDeleteHighScore(id).then(()=> {
            this.props.highscores.highscores.sort((a, b) => Number(b.score) - Number(a.score))
            this.setState({
                highscores: this.props.highscores.highscores
            })
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const filteredScores = this.state.highscores
            .filter(score => score.name.toLowerCase().indexOf(this.state.nameQuery.toLowerCase()) === 0)
        const filteredString = filteredScores
            .filter(score => score.score.toString().indexOf(this.state.scoreQuery === 0));
        const mappedScores = filteredString.map(score => {
            return (
                <Highscore
                    key={score._id}
                    handleEditConfirm={this.handleEditConfirm}
                    handleDelete={this.handleDelete}
                    name={score.name}
                    score={score.score}
                    _id={score._id}
                />
            )
        })

        const sideBar = {
            width: this.state.showSidebar ? '23%' : '20px',
            position: 'fixed',
            height: '100%',
            right: '0',
            backgroundColor: '#333',
            gridColumn: '1',
            transition: 'ease-out .4s'
        }

        return (
            <div className="adminPageContainer">
                <div style={sideBar}>
                { !this.state.showSidebar ?
                    <button onClick={this.toggleSidebar}><i className="ion-ios-arrow-left"></i></button>
                :
                    <div className="activeBtn">
                        <button onClick={this.toggleSidebar}><i className="ion-ios-arrow-right"></i></button>
                        <Sidebar
                            handleChange={this.handleChange}
                            nameQuery={this.state.nameQuery}
                            scoreQuery={this.state.scoreQuery}
                        />
                    </div>
                }

                </div>
                <div className="adminHighscoresContainer">
                    {mappedScores}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        highscores: state.highscores
    }
}


export default connect(mapStateToProps, { getHigh, adminEditHighScore, adminDeleteHighScore })(Admin);
