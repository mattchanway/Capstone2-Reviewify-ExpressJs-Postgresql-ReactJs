// ** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const { CLIENT_ID, CLIENT_SECRET } = require("../.ENV");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const ReviewManager = require('../models/ReviewManager');
const UserManager = require("../models/UserManager");




// ** GET / get overview of all reviews

router.get("/", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let reviewifyTokenResp = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (reviewifyTokenResp) {
            const result = await ReviewManager.getAllReviews();
            return res.json(result);
        }
    } catch (err) {
        return next(err);
    }
})

// ** GET / get latest 20 reviews

router.get("/latest", async function (req, res, next) {

    try {

        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const latestReviews = await ReviewManager.getLatestReviews();
            return res.json(latestReviews);
        }
    } catch (err) {
        return next(err);
    }
})

// ** GET / get one sample popular reviews, sample new reviews, featured artists,
// and featured reviewers as data for homepage banners.

router.get("/sample", async function (req, res, next) {

    try {

        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const { latest, artist, popular } = await ReviewManager.getSampleData();
            const featuredReviewers = await UserManager.getTopReviewers();

            return res.json({
                latest, popular,
                artist, featuredReviewers
            });
        }
    } catch (err) {
        return next(err);
    }
})

// ** GET / get the top 20 engaged reviews (most comments)

router.get("/popular", async function (req, res, next) {

    try {

        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const result = await ReviewManager.getPopularReviews();
            return res.json(result);
        }
    } catch (err) {
        return next(err);
    }
})



// ** POST / Add comment on a review.

router.post("/comments/:reviewId", async function (req, res, next) {

    try {

        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const result = await ReviewManager.addReviewComment(req.params.reviewId,
                sessionIdVerification.username, req.body.comment)
            return res.json(result);
        }

    } catch (err) {
        return next(err);
    }
})

// ** POST / Delete comment on a review.

router.post("/comments/comment/:commentId", async function (req, res, next) {

    try {

        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const result = await ReviewManager.deleteReviewComment(req.params.commentId);
            return res.json(result);
        }

    } catch (err) {
        return next(err);
    }
})




// ** GET / get all artists for which there are reviews.

router.get("/artists", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const result = await ReviewManager.getReviewArtists();
            return res.json(result)
        };
    } catch (err) {
        return next(err);
    }
});


// ** GET / get reviews on a single artist.

router.get("/artists/:artist", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const result = await ReviewManager.getReviewsByArtist(req.params.artist);
            return res.json(result);
        };
    } catch (err) {
        return next(err);
    }
});

// ** GET / get detail on a single review.

router.get("/:id", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            const result = await ReviewManager.getReview(req.params.id);
            return res.json(result);
        };
    } catch (err) {
        return next(err);
    }
});

// ** GET / Get a list of reviews by search term.

router.get("/search/:searchTerm", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {
            let result = await ReviewManager.reviewsSearch(req.params.searchTerm)
            return res.json(result)
        };
    } catch (err) {
        return next(err);
    }
});

// ** POST / Add a review to the database.

router.post("/", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {

            let newReview = await ReviewManager.addNewReview(req.body, sessionIdVerification.username, req.cookies.sessionId);
            if (newReview.noRefreshToken) return res.json({ message: 'No refresh token available.' });

            return res.json(newReview);
        };
    } catch (err) {
        return next(err);
    }
});

// ** DELETE / Delete a review from the database.

router.delete("/:reviewId", async function (req, res, next) {


    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'You must be logged in to delete.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        let deleteReviewResp = await ReviewManager.deleteReview(sessionIdVerification.username, req.params.reviewId);
        return res.json(deleteReviewResp);
    }
    catch (err) {
        return next(err);
    }
});

router.put("/:reviewId", async function (req, res, next) {


    try {

        if (!req.cookies.sessionId) return res.json({ unauthorized: 'You must be logged in to edit.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        let result = await ReviewManager.editReview(sessionIdVerification.username, req.params.reviewId, req.body);
        return res.json(result);

    } catch (err) {
        return next(err);
    }
});

module.exports = router;