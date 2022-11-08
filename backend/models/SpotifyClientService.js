const db = require("../db");
const User = require("./UserManager");
const express = require("express");
const router = new express.Router();
const cookieParser = require("cookie-parser")
router.use(cookieParser());
const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = require("../.ENV");
const jwt = require("jsonwebtoken");
let BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
let REDIRECT_URI = BASE_URL + '/auth/callback';
const SPOTIFY_AUTH_REDIRECT = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
const Url = require('url');

class SpotifyClientService {

    static async getSpotifyApiResult(endpoint, sessionId, newlyRefreshedToken) {
        try {
            let retrievedToken = !newlyRefreshedToken ? await User.getUserToken(sessionId) : newlyRefreshedToken;
            let result = await axios.get(`https://api.spotify.com/v1/${endpoint}`,
                { headers: { 'Authorization': 'Bearer ' + retrievedToken } });
            return result.data;
        }
        catch (e) {
            console.log(e)
            return e.response.status;
        }
    }

    static async getSpotifyToken(code) {

        let buffer = new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
        let base64 = buffer.toString('base64');
        let params = new Url.URLSearchParams({ grant_type: "authorization_code", code: `${code}`, redirect_uri: `${REDIRECT_URI}` })
        let result = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
            headers: {
                'Authorization': 'Basic ' + base64,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(result.data);
        return result.data;
    }


    static async validateUserAndGetSessionId(data) {

        let userReq = await axios.get('https://api.spotify.com/v1/me',
            { headers: { 'Authorization': 'Bearer ' + data.access_token } });
        let userDetails = userReq.data;
        let sessionIdPayload = { username: userDetails.display_name };
        let sessionId = jwt.sign(sessionIdPayload, CLIENT_SECRET);
        await User.addUpdateUser(userDetails.display_name, sessionId, data);
        return sessionId;

    }



}


module.exports = SpotifyClientService;