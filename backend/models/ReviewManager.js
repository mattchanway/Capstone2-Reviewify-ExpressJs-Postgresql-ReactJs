const db = require("../db");
const UserManager = require("./UserManager");
const SpotifyClientService = require("./SpotifyClientService");
const express = require("express");
const router = new express.Router();
const cookieParser = require("cookie-parser")
router.use(cookieParser());
const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = require("../.ENV");
const jwt = require("jsonwebtoken");
let BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
let REDIRECT_URI = BASE_URL + '/auth/callback';



class ReviewManager {

    static async getAllReviews() {
        try {
            const result = await db.query(`
        SELECT id, review_username, album_id, album_name,title, description, rating FROM reviews`);
            console.log(result.rows)
            return result.rows;
        }
        catch (e) {
            return e;
        }
    }

    static async getSampleData() {

        try {
            const artistQuery = await db.query(`SELECT COUNT(reviews.album_artist), reviews.album_artist, 
        artists.image FROM reviews JOIN artists ON reviews.artist_id = artists.artist_id 
        GROUP BY reviews.album_artist, 
        artists.image ORDER BY count desc LIMIT 10;`)
            console.log(artistQuery.rows)
            const latestReview = await db.query(`
        SELECT * FROM reviews ORDER BY review_date DESC limit 5`);
            const popularReview = await db.query(`SELECT COUNT(review_comments.comment_id), reviews.id, 
            reviews.title, reviews.review_username, reviews.body, reviews.album_artist, 
            reviews.album_id, reviews.album_name, reviews.album_art, 
        reviews.description, reviews.rating from review_comments join reviews ON 
        review_comments.review_id = reviews.id GROUP BY reviews.id
        ORDER BY COUNT desc LIMIT 5;
        `);
            return { artist: artistQuery.rows, latest: latestReview.rows, popular: popularReview.rows };
        }
        catch (e) {
            return e;
        }

    }

    static async getLatestReviews() {
        try {
            const result = await db.query(`
        SELECT * FROM reviews ORDER BY review_date DESC limit 20`);
            return result.rows;
        }
        catch (e) {
            return e;
        }
    }

    static async getPopularReviews() {
        try {
            const result = await db.query(
                `SELECT COUNT(review_comments.comment_id), reviews.id
                from review_comments join reviews ON review_comments.review_id = reviews.id 
                GROUP BY reviews.id ORDER BY COUNT asc LIMIT 10`);
            let paramStr = '';
            let i = 0;
            while (i < result.rows.length) {
                if (i === result.rows.length - 1) paramStr = paramStr + `id=$${i + 1}`
                else { paramStr = paramStr + `id=$${i + 1} or ` }
                i++;
            }
            let params = result.rows.map(r => +r.id);
            const popularReviews = await db.query(
                `SELECT * from reviews WHERE
            ${paramStr}`, params
            )
            return popularReviews.rows;
        }
        catch (e) {
            return e;
        }
    }

    static async addReviewComment(reviewId, commentor, comment) {
        try {
            const result = await db.query(`
        INSERT INTO review_comments (review_id, comment_username, comment)
        VALUES($1, $2, $3) RETURNING
         *`, [reviewId, commentor, comment]);
            return (result.rows);
        }
        catch (e) {
            return e;
        }

    }

    static async deleteReviewComment(commentId) {
        try {
            const result = await db.query(`
        DELETE FROM review_comments
        WHERE comment_id = $1`, [commentId]);
            return result.rows;
        }
        catch (e) {
            return e;
        }

    }

    static async getReviewArtists() {
        try {
            const result = await db.query(`
            SELECT * from artists;`);

            return result.rows;

        }
        catch (e) {
            return e;
        }

    }

    static async getReviewsByArtist(artist) {
        try {
            const result = await db.query(`
        SELECT * FROM reviews
        WHERE (album_artist) = $1`, [artist]);
            console.log(result.rows)
            return result.rows;

        }
        catch (e) {
            return e;
        }

    }

    static async getReview(id) {
        try {
            const result = await db.query(`
            SELECT * FROM reviews
            WHERE id = $1`, [id]);
            const commentQuery = await db.query(`
            SELECT * FROM review_comments WHERE
            review_id = $1`, [id]);

            return { review: result.rows[0], comments: commentQuery.rows }

        }
        catch (e) {
            return e;
        }
    }

    static async reviewsSearch(searchTerm) {
        try {
            let searchQuery = await db.query(`SELECT * FROM
        reviews WHERE LOWER(album_name) 
        LIKE $1 OR LOWER(title) LIKE $1`, [`%${searchTerm}%`]);
            return searchQuery.rows;
        }
        catch (e) {
            return e;
        }

    }

    static async GetSpotifyArtistInfo(artist_id, sessionId) {
        try {

            let result = await SpotifyClientService.getSpotifyApiResult(`artists/${artist_id}`, sessionId);
            if (result === 401) {
                let newTokenCall = await UserManager.checkForAndActivateRefreshToken(sessionId);
                if (!newTokenCall) return ({ noRefreshToken: 'No refresh token available.' });
                let newResult = await UserManager.getSpotifyApiResult(`artists/${artist_id}`, newTokenCall.token.spotify_access_token)
                return newResult;
            }
            return result;
        }
        catch (e) {
            return e;
        }
    }

    static async addNewReview(data, username, sessionId) {
        try {
            const { title, description, body, rating, album_id, artist_id, album_art, album_name, album_artist } = data;
            const artistsSearchQuery = await db.query(`SELECT * FROM artists WHERE artist_id = $1`, [artist_id])
            if (!artistsSearchQuery.rows.length) {

                let artistDetails = await this.GetSpotifyArtistInfo(artist_id, sessionId);
                let artistsInsertQuery = await db.query(`INSERT INTO artists (artist_id,
            name, image, genre) VALUES($1,$2,$3,$4)`, [artistDetails.id,
                artistDetails.name, artistDetails.images[1].url, artistDetails.genres[0]])
            }
            const result = await db.query(`
        INSERT INTO reviews (review_username, album_id, title, description, body, rating, album_name, album_art, album_artist, artist_id)
        VALUES ($1, $2, $3,$4,$5,$6,$7,$8, $9,$10) RETURNING id`, [username, album_id, title, description, body, rating,
                album_name, album_art, album_artist, artist_id]);
            console.log('id should be here', result)
            return result.rows;
        }
        catch (e) {
            return e;
        }

    }

    static async deleteReview(username, reviewId) {
        try {
            let userCheck = await db.query(`SELECT review_username FROM reviews
        WHERE review_username = $1 AND id = $2`, [username, reviewId]);
            if (!userCheck.rows.length) return ({ unauthorized: `You do not have permission to delete this review.` })
            else {
                const result = await db.query(`
        DELETE FROM reviews
        WHERE id = $1`, [reviewId]);
                return result.rows;
            }
        }
        catch (e) {
            return e;
        }

    }

    static async editReview(username, reviewId, data) {
        try {

            let userCheck = await db.query(`SELECT review_username FROM reviews
        WHERE review_username = $1 AND id = $2`, [username, reviewId]);
            if (!userCheck.rows.length) return ({ unauthorized: `You do not have permission to edit this review.` })
            else {
                let { title, description, body, rating } = data;
                const result = await db.query(`
        UPDATE reviews SET title = $2, description = $3, body = $4, rating = $5
        WHERE id = $1 RETURNING *`, [reviewId, title, description, body, rating]);
                console.log(result.rows)
                return result.rows;
            }

        }
        catch (e) {
            return e;
        }

    }





}


module.exports = ReviewManager;