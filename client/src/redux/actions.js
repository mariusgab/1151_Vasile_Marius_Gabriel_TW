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

export function selectSong(song) {
    return async dispatch => {
        // let response = await fetch(`${SERVER}/playlists`);
        // let json = await response.json()

        dispatch({
            type: 'SELECT_SONG',
            payload: song
        })
    }
}

export function getPlaylists(query) {
    return async dispatch => {
        let response = await fetch(query ? `${SERVER}/playlists/${query}` : `${SERVER}/playlists`);
        let json = await response.json()

        if (Object.keys(json).length === 0) {
            dispatch({
                type: 'GET_PLAYLISTS',
                payload: []
            })
        }
        else {
            dispatch({
                type: 'GET_PLAYLISTS',
                payload: json
            })

            dispatch({
                type: 'SELECT_PLAYLIST',
                payload: json[0]
            })
        }
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

        dispatch({
            type: 'SELECT_PLAYLIST',
            payload: json[json.length - 1]
        })
    }
}

export function updatePlaylist(playlist) {
    return async dispatch => {
        let response = await fetch(`${SERVER}/playlists/${playlist.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        })

        let json = await response.json()

        dispatch({
            type: 'UPDATE_PLAYLIST',
            payload: json
        })
    }
}

export function deletePlaylist(playlistId) {
    return async dispatch => {
        let response = await fetch(`${SERVER}/playlists/${playlistId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        let json = await response.json()

        if (Object.keys(json).length === 0) {
            dispatch({
                type: 'DELETE_PLAYLIST',
                payload: []
            })
            dispatch({
                type: 'SELECT_PLAYLIST',
                payload: null
            })
        }
        else {
            dispatch({
                type: 'DELETE_PLAYLIST',
                payload: json
            })

            dispatch({
                type: 'SELECT_PLAYLIST',
                payload: json[0]
            })
        }
    }
}

export function sortPlaylists(playlists, ascending) {
    return async dispatch => {
        dispatch({
            type: 'SORT',
            payload: ascending ? playlists.sort((a, b) => a.descriere.toLowerCase() > b.descriere.toLowerCase() ? 1 : -1) : playlists.sort((a, b) => a.descriere.toLowerCase() < b.descriere.toLowerCase() ? 1 : -1)
        })
    }

}

export function getSongs(playlistId, query) {
    return async dispatch => {
        let response = await fetch(query ? `${SERVER}/songs/${playlistId}/${query}` : `${SERVER}/songs/${playlistId}`);
        let json = await response.json()

        if (Object.keys(json).length === 0) {
            dispatch({
                type: 'GET_SONGS',
                payload: []
            })
        }
        else {
            dispatch({
                type: 'GET_SONGS',
                payload: json
            })
        }

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

export function updateSong(song) {
    return async dispatch => {
        let response = await fetch(`${SERVER}/songs/${song.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        })

        let json = await response.json()

        dispatch({
            type: 'UPDATE_SONG',
            payload: json
        })
    }
}


export function deleteSong(songId) {
    return async dispatch => {
        let response = await fetch(`${SERVER}/songs/${songId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        let json = await response.json()

        dispatch({
            type: 'DELETE_SONG',
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
