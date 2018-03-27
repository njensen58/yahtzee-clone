const controls = {
    shouldReset: false,
    hasSelected: true,
    rollCount: 0,
    allowSelection: false
}





export function reset(){
    return {
        type: "RESET"
    }
}

export function undoReset(){
    return {
        type: "UNDO_RESET"
    }
}

export function isSelecting(){
    return {
        type: "IS_SELECTING"
    }
}

export function isDoneSelecting(){
    return {
        type: "IS_DONE_SELECTING"
    }
}

export function allowSelection(){
    return {
        type: "ALLOW_SELECTION"
    }
}

export function disallowSelection(){
    return {
        type: "DISALLOW_SELECTION"
    }
}





function reducer(state = controls, action){
    switch(action.type){
        case "RESET":
            return {
                ...state,
                shouldReset: true
                }
        case "UNDO_RESET":
            return  {
                ...state,
                shouldReset: false
                }
        case "IS_SELECTING":
            return {
                ...state,
                hasSelected: false
            }
        case "IS_DONE_SELECTING":
            return {
                ...state,
                hasSelected: true
            }
        case "ALLOW_SELECTION":
            return {
                ...state,
                allowSelection: true
            }
        case "DISALLOW_SELECTION":
            return {
                ...state,
                allowSelection: false
            }
        default:
            return state
    }
}



export default reducer;
