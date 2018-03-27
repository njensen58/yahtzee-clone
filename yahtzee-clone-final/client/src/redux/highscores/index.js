import axios from 'axios';

export function getHigh(){
    return function(dispatch){
        return axios.get('/highscores').then(response => {
            dispatch({
                type: "GET_HIGH",
                highscores: response.data
            })
        })
    }
}

export function addHighScore(newHighScore){
    return function(dispatch){
        return axios.post('/highscores', newHighScore).then(response => {
            dispatch({
                type: "ADD_HIGH_SCORE",
                newHighScore: response.data
            })
        })
    }
}

export function adminEditHighScore(item){
    return function(dispatch){
        return axios.put(`/admin-almighty/${item._id}`, item).then(response => {
            dispatch({
                type: "ADMIN_EDIT_HIGH_SCORE",
                editedScore: response.data
            })
        })
    }
}

export function adminDeleteHighScore(id){
    return function(dispatch){
        return axios.delete(`/admin-almighty/${id}`).then(response => {
            dispatch({
                type: "ADMIN_DELETE_HIGH_SCORE",
                deletedScore: response.data
            })
        })
    }
}


function reducer(state = {}, action){
    switch(action.type){
        case "GET_HIGH":
            return {
                highscores: action.highscores
            }
        case "ADD_HIGH_SCORE":
            return {
                highscores: [...state, action.newHighScore]
            }
        case "ADMIN_EDIT_HIGH_SCORE":
            const filteredScores = state.highscores.filter(item => item._id !== action.editedScore._id)
            return {
                highscores: [...filteredScores, action.editedScore]
            }
        case "ADMIN_DELETE_HIGH_SCORE":
            const filteredScores2 = state.highscores.filter(item => item._id !== action.deletedScore._id)
            return {
                highscores: [...filteredScores2]
            }
        default:
            return state
    }
}


export default reducer;
