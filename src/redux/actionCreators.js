import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "";



export function getAlbumFromApi(id, token) {

    return async function (dispatch) {
        let res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, { headers: { 'Authorization': 'Bearer ' + token } });

        dispatch({
            type: "LOAD-ALBUM",
            payload: res.data
        });

    }
}

export function getSearchResultFromApi(token, searchTerm) {

    return async function (dispatch) {
        let res = await axios.get(`https://api.spotify.com/v1/search?type=album&q=${searchTerm}`, { headers: { 'Authorization': 'Bearer ' + token } });

        dispatch({
            type: "LOAD-SEARCH-RESULTS",
            payload: res.data
        });

    }
}

export function getAllReviewsFromApi() {

    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/reviews`);

        dispatch({
            type: "LOAD-REVIEW-LIST",
            payload: res.data
        });
    }
}

export function getAllArtistsFromApi() {

    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/reviews/artists`);

        dispatch({
            type: "LOAD-ARTISTS-LIST",
            payload: res.data
        });
    }
}

export function getArtistReviewsFromApi(artist) {

    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/reviews/artists/${artist}`);


        dispatch({
            type: "LOAD-ARTIST-REVIEW-LIST",
            payload: res.data
        });
    }
}

export function getReviewIndexFromApi() {

    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/reviews/index`);

        dispatch({
            type: "LOAD-REVIEW-INDEX",
            payload: res.data
        });
    }
}


export function checkUser() {

    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/auth/whoami`);
        console.log('who am i', res.data)
        dispatch({
            type: "LOAD-CURR-USER",
            payload: res.data
        })

    }

}

export function getSingleReviewFromApi(id) {

    return async function (dispatch) {
        let res = await axios.get(`${BASE_URL}/reviews/${id}`);
        dispatch({
            type: "LOAD-ACTIVE-REVIEW",
            payload: res.data
        });

    }
}


