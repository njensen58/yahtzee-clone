import React from 'react';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('/game')
    }

    render(){
        return (
            <div className="homepageContainer">
                <div className="homepageOverlay">
                    <h1>YAHTZEE.clone</h1>
                    <button onClick={this.handleClick}>PLAY</button>
                </div>
            </div>
        )
    }
}

export default Home;
