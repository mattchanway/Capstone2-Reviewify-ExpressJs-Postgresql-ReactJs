// Reviewly backend express app.

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const reviewsRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const albumRoutes = require("./routes/albums");
const authRoutes = require("./routes/auth.js")
const app = express();
app.use(cookieParser());
app.use(bodyParser.json())

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/reviews", reviewsRoutes);
app.use("/users", userRoutes);
app.use("/albums", albumRoutes);
app.use("/auth", authRoutes.router);


// 404 Not Found handler * //

app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Generic error handler. *//

app.use(function (err, req, res, next) {

    res.status(err.status || 500).json({
        message: err.message
    });

});

module.exports = app;