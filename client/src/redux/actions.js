const SERVER = process.env.NODE_ENV == "development" ? `http://localhost:8080` : `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

export function selectPlaylist(playlist) {
    return async dispatch => {
        // let response = await fetch(`${SERVER}/playlists`);
        // let json = await response.json()

        dispatch({
            type: 'SELECT_PLAYLIST',
            payload: playlist
        })
    }
}

export function getPlaylists() {
    return async dispatch => {
        let response = await fetch(`${SERVER}/playlists`);
        let json = await response.json()

        dispatch({
            type: 'GET_PLAYLISTS',
            payload: json
        })
    }
}

export function postPlaylist(playlist) {
    return async dispatch => {
        let response = await fetch(`${SERVER}/playlists`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        })

        let json = await response.json()

        dispatch({
            type: 'POST_PLAYLIST',
            payload: json
        })
    }
}

export function postSong(song, playlistId) {
    return async dispatch => {
        let response = await fetch(`${SERVER}/songs/${playlistId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        })

        let json = await response.json()

        dispatch({
            type: 'POST_SONG',
            payload: json
        })
    }
}


export function syncDB() {
    return async dispatch => {
        let response = await fetch(`${SERVER}/sync`);
        let json = await response.json()

        dispatch({
            type: 'SYNC_DB',
            payload: {}
        })
    }
}
