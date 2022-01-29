const INITIAL_STATE = {
    playlists: [],
    selectedPlaylist: null,
    selectedSong: null,
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

        case 'POST_PLAYLIST':
            return {
                ...state,
                playlists: action.payload
            }
        case 'UPDATE_PLAYLIST':
            return {
                ...state,
                playlists: action.payload
            }
        case 'DELETE_PLAYLIST':
            return {
                ...state,
                playlists: action.payload
            }

        case 'SELECT_SONG':
            return {
                ...state,
                selectedSong: action.payload
            }
        case 'GET_SONGS':
            return {
                ...state,
                selectedPlaylist: action.payload
            }
        case 'POST_SONG':
            return {
                ...state,
                selectedPlaylist: action.payload
            }
        case 'DELETE_SONG':
            return {
                ...state,
                selectedPlaylist: action.payload
            }


        default:
            return {
                ...state,
            }
    }
    return state
}