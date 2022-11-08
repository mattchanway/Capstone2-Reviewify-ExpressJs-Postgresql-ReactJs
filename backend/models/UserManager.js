const db = require("../db");
const express = require("express");
const router = new express.Router();
const cookieParser = require("cookie-parser")
router.use(cookieParser());
const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = require("../.ENV");
const jwt = require("jsonwebtoken");
let BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
let REDIRECT_URI = BASE_URL + '/auth/callback';
const SPOTIFY_AUTH_REDIRECT = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
const Url = require('url');

class UserManager {


    static async addUpdateUser(username, sessionId, data) {
        let userSearch = await db.query(`
        SELECT * FROM users WHERE
        username = $1`, [username]);
        if (!userSearch.rows.length) {
            let addUserDbQuery = await db.query(`INSERT INTO users (username,
            spotify_access_token, spotify_refresh_token, reviewify_session_id) values($1, $2, $3, $4)`,
                [username, data.access_token, data.refresh_token, sessionId]);
        }
        else if (userSearch.rows.length) {
            let updateUserDbQuery = await db.query(`UPDATE users
        SET spotify_access_token = $1, spotify_refresh_token = $2, reviewify_session_id = $3
        WHERE username = $4 `,
                [data.access_token, data.refresh_token, sessionId, username]);
        }
    }

    static async getUserToken(sessionId) {

        let tokenQuery = await db.query(`SELECT
        spotify_access_token FROM users WHERE reviewify_session_id = $1`, [sessionId]);
        return tokenQuery.rows[0].spotify_access_token;
    }

    static async checkForAndActivateRefreshToken(sessionId) {
        let refreshTokenQuery = await db.query(`SELECT
    spotify_refresh_token FROM users WHERE reviewify_session_id = $1`, [sessionId]);
        if (!refreshTokenQuery.rows[0].spotify_refresh_token) return false;
        console.log(refreshTokenQuery)
        let refreshToken = refreshTokenQuery.rows[0].spotify_refresh_token;

        let buffer = new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
        let base64 = buffer.toString('base64');
        let params = new Url.URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken })
        let result = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
            headers: {
                'Authorization': 'Basic ' + base64,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        let updateUserDbQuery = await db.query(`UPDATE users
        SET spotify_access_token = $1, spotify_refresh_token = $2
        WHERE reviewify_session_id = $3
        RETURNING spotify_access_token`,
            [result.data.access_token, null, sessionId]);

        return { token: updateUserDbQuery.rows[0] };

    }

    static async getTopReviewers() {
        const featuredReviewers = await db.query(`SELECT * FROM users WHERE stars >0 ORDER BY stars desc LIMIT 5`);
        return featuredReviewers.rows;

    }

    static async getAllUsers() {

        try {
            const result = await db.query(`
            SELECT * FROM users
            ORDER BY stars desc`);
            return (result.rows);
        } catch (err) {
            return err;
        }
    }

    static async getUserDetail(username) {
        try {
            const result = await db.query(`
            SELECT users.username, users.bio, users.stars, users.avatar,
            reviews.id, reviews.artist_id, reviews.album_artist, reviews.album_id,
            reviews.album_name, reviews.album_art, reviews.title, reviews.description,
            reviews.body, reviews.review_date, reviews.rating
            FROM users JOIN reviews
            ON users.username = reviews.review_username
            WHERE users.username = $1`, [username]);

            // if no reviews
            if (result.rows.length === 0) {
                let noReviewsResult = await db.query(`SELECT 
                username, bio, stars, avatar FROM users WHERE username = $1`, [username]);
                return (noReviewsResult.rows);

            }
            return (result.rows);
        }
        catch (e) {
            return e;
        }
    }

    static async getUserVotes(username) {
        try {
            let getStars = await db.query(`SELECT * from star_votes
            WHERE username_doing_rating = $1`, [username])
            let responseObj = {};
            getStars.rows.forEach(r => responseObj[r.username_being_rated] = r.rating)
            console.log(responseObj)
            return (responseObj);
        }
        catch (e) {
            return e;
        }
    }

    static async addUserStar(username, userVoting) {
        try {
            const checkForPriorVote = await db.query(`SELECT * FROM
        star_votes WHERE username_being_rated = $1 AND username_doing_rating
        = $2`, [username, userVoting]);

            if (!checkForPriorVote.rows.length) {
                const addRecord = await db.query(`
        INSERT INTO star_votes (username_being_rated, username_doing_rating, rating)
        VALUES ($1, $2, $3)`, [username, userVoting, 1])
            }
            else {
                const deletePriorVote = await db.query(`
        DELETE from star_votes where username_being_rated = $1 AND
        username_doing_rating = $2`, [username, userVoting])

            }

            const result = await db.query(`
        UPDATE users set stars = stars+1
        WHERE username = $1 RETURNING bio,
        stars, avatar, username`
                , [username]);
            return (result.rows);

        }
        catch (e) {
            return e;
        }

    }

    static async removeUserStar(username, userVoting) {
        try {
            const checkForPriorVote = await db.query(`SELECT * FROM
        star_votes WHERE username_being_rated = $1 AND username_doing_rating
        = $2`, [username, userVoting]);

            if (!checkForPriorVote.rows.length) {
                const addRecord = await db.query(`
            INSERT INTO star_votes (username_being_rated, username_doing_rating, rating)
            VALUES ($1, $2, $3)`, [username, userVoting, -1]);
            }
            else {
                const deletePriorVote = await db.query(`
        DELETE from star_votes where username_being_rated = $1 AND
        username_doing_rating = $2`, [username, userVoting])
            }
            const result = await db.query(`
        UPDATE users set stars = stars-1
        WHERE username = $1 RETURNING bio,
        stars, avatar, username`
                , [username]);
            return (result.rows);
        }
        catch (e) {
            return e;
        }
    }

    static async editUserBio(username, newBio) {
        try {
            const result = await db.query(`
            UPDATE users set bio = $1
            WHERE username = $2 RETURNING bio,
            stars, avatar, username`
                , [newBio, username]);
            return (result.rows);
        }
        catch (e) {
            return e;
        }
    }

    static async editUserAvatar(username, newAvatar) {
        try {
            const result = await db.query(`
        UPDATE users set avatar = $1
        WHERE username = $2 RETURNING bio,
        stars, avatar, username`
                , [newAvatar, username]);
            return (result.rows);
        }
        catch (e) {
            return e;
        }
    }



}


module.exports = UserManager;