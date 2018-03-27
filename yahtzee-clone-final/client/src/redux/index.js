import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import scorecard from './scorecard';
import highscores from './highscores';
import controls from './controls';
import gamecontrol from './gamecontrol';


const rootReducer = combineReducers({
    scorecard,
    controls,
    gamecontrol,
    highscores
})



let store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);



store.subscribe(()=>{
    let state = store.getState();
    sessionStorage.setItem('scorecard', JSON.stringify(state.scorecard));
    sessionStorage.setItem('gamecontrol', JSON.stringify(state.gamecontrol))
})


export default store;
