import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Game from './Game';
import Highscores from './Highscores';
import Footer from './Footer';
import Admin from './Admin';


function App(props){
    return (
        <div>
            <Navbar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/game" component={Game}/>
                    <Route path="/highscores" component={Highscores}/>
                    <Route path="/admin-almighty" component={Admin}/>
                </Switch>
            <Footer />
        </div>
    )
}

export default App;
