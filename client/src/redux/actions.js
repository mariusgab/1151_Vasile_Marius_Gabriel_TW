const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`


export function getData() {
    return async dispatch => {
        let response = await fetch(`${SERVER}/data`);
        let json = await response.json()

        dispatch({
            type: 'GET_DATA',
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
