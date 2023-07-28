const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/user')
const mongoose = require('mongoose');




// express app initialize
const app = express();

const port = process.env.PORT;

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


// routes
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests when connected with db

        app.listen(port, () => {
            console.log('connected to db and listening on port 4000');
        });

    })
    .catch((err) => {
        console.log(err);
    })