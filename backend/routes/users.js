const db = require("../db");
const express = require("express");
const router = new express.Router();

const cookieParser = require("cookie-parser")
router.use(cookieParser());
const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = require("../.ENV");
const jwt = require("jsonwebtoken");
const UserManager = require("../models/UserManager");

// ** GET / get overview of all users

router.get("/", async function (req, res, next) {

    try {
        const result = await UserManager.getAllUsers();
        return res.json(result);

    } catch (err) {
        return next(err);
    }
})

// ** GET / get detail on a single user.

router.get("/:username", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification && req.params.username !== req.body.userVoting) {
            let result = await UserManager.getUserDetail(req.params.username);
            return res.json(result);
        }
    } catch (err) {
        return next(err);
    }
});

// ** GET / get a record of all votes a user has made..

router.get("/:username/votes", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification) {

            let result = await UserManager.getUserVotes(req.params.username);
            return res.json(result);
        }
    } catch (err) {
        return next(err);
    }
});

// Add a star to a user (as in an up-vote, or sign of kudos displayed on their profile.)
router.post("/:username/add-star", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification && req.params.username !== req.body.userVoting) {

            let result = await UserManager.addUserStar(req.params.username, req.body.userVoting);

            return res.json(result);
        }
    } catch (err) {
        return next(err);
    }
});

// Remove a star to a user (as in an up-vote, or sign of kudos displayed on their profile.)
router.post("/:username/remove-star", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification && req.params.username !== req.body.userVoting) {

            let result = await UserManager.removeUserStar(req.params.username, req.body.userVoting);
            return res.json(result);
        }
    } catch (err) {
        return next(err);
    }
});

router.patch("/:username/bio", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification && req.params.username !== sessionIdVerification.username) return res.json({ unauthorized: 'You cannot update this user.' })
        let result = await UserManager.editUserBio(req.params.username, req.body.newBio)
        return res.json(result);

    }
    catch (err) {
        return next(err);
    }
});

router.patch("/:username/avatar", async function (req, res, next) {

    try {
        if (!req.cookies.sessionId) return res.json({ unauthorized: 'Please login to see reviews.' })
        let sessionIdVerification = jwt.verify(req.cookies.sessionId, CLIENT_SECRET);
        if (sessionIdVerification && req.params.username !== sessionIdVerification.username) return res.json({ unauthorized: 'You cannot update this user.' })
        let result = await UserManager.editUserAvatar(req.params.username, req.body.newAvatar);
        return res.json(result);

    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;