const INITIAL_STATE = {
    playlists : [],
    selectedPlaylist: null,
    songs: []
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SELECT_PLAYLIST':
            return {
                ...state,
                selectedPlaylist: action.payload
            }
        case 'GET_PLAYLISTS':
            return {
                ...state,
                playlists: action.payload
            }
        default:
            return {
                ...state,
            }
    }
    return state
}