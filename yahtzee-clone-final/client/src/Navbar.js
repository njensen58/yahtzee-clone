import React from 'react';
import { Link } from 'react-router-dom';
import Fabars from 'react-icons/lib/fa/bars';
import Famin from 'react-icons/lib/fa/minus';

class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {
            expandedNav: false
        }
        this.handleExpandNav = this.handleExpandNav.bind(this);
    }

    handleExpandNav(){
        this.setState(prevState => ({
            expandedNav: !prevState.expandedNav ? true : false
        }))
    }

    render(){

        const dropdownMenu = {
            display: this.state.expandedNav ? 'flex' : 'none',
            position: 'absolute',
            flexDirection: 'column',
            backgroundColor: 'rgba(4, 3, 3, 0.83)',
            padding: '5px'
        }

        return (
            <div className="navDiv">
            { this.state.expandedNav ?
                <div>
                <span onClick={this.handleExpandNav}>
                    <i className="navicon"><Famin /></i>
                </span>
                    <div style={dropdownMenu} onClick={this.handleExpandNav}>
                        <Link to="/">Home</Link>
                        <Link to="/game">Game</Link>
                        <Link to="/highscores">Highscores</Link>
                    </div>
                </div>
            :
                <span onClick={this.handleExpandNav}>
                    <i className="navicon"><Fabars /></i>
                </span>
            }

            </div>
        )
    }
}

export default Navbar;
