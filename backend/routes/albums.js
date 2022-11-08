const db = require("../db");
const express = require("express");
const router = new express.Router();
const axios = require('axios');

// ** GET / get overview of all users

router.get("/:id", async function (req, res, next){

    try{
        const albumId = req.params.id;
        const result = axios.get(`https://api.spotify.com/v1/albums/${albumId}`)
        return res.json(result);
    } catch(err){
        return next(err);
    }
})

// ** GET / get detail on a single user.

// router.get("/:username", async function (req, res, next){

//     try{
//         const result = await db.query(`
//         SELECT * FROM users
//         WHERE username = $1`, [req.params.username]);
//         return res.json(result.rows);
//     } catch(err){
//         return next(err);
//     }
// });

module.exports = router;