const scorecard = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    yahtzee: 0,
    chance: 0,
    yahtzeeBonus: []
}


export function updateScorecard(update, section){
    return {
        type: "UPDATE_SCORECARD",
        update,
        section
    }
}


export function updateYahtzeeBonus(newBonus){
    return {
        type: "UPDATE_YAHTZEE_BONUS",
        newBonus
    }
}

export function resetScorecard(){
    return {
        type: "RESET_SCORECARD"
    }
}


function reducer(state = scorecard, action){
    switch(action.type){
        case "UPDATE_SCORECARD":
            return {
                ...state,
                [action.section]: action.update
            }
        case "UPDATE_YAHTZEE_BONUS":
            return {
                ...state,
                yahtzeeBonus: [...state.yahtzeeBonus, action.newBonus]
            }
        case "RESET_SCORECARD":
            return {
                ones: 0,
                twos: 0,
                threes: 0,
                fours: 0,
                fives: 0,
                sixes: 0,
                threeOfAKind: 0,
                fourOfAKind: 0,
                fullHouse: 0,
                smallStraight: 0,
                largeStraight: 0,
                yahtzee: 0,
                chance: 0,
                yahtzeeBonus: []
            }
        default:
            return state
    }
}



export default reducer;
