const INITIAL_STATE = {
    data : []
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                data: action.payload
            }
        default:
            return {
                ...state,
            }
    }
    return state
}