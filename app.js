const express = require('express')
const app = express()
const session = require('express-session');
const passport = require('passport')

require('dotenv').config()
const passportSetup = require('./config/passport-setup')

const mongoose = require('mongoose')
const { MONGO_URI, KEY } = process.env


// connect to mongodb
const connect = () => {
    try {
        mongoose.connect(MONGO_URI, {
            useNewUrlParser:'true',
            useUnifiedTopology:'true'
        })
        console.log("Connection to db successful");
    } catch (error) {
        console.log(error.message);
    }
}
connect()


const authRoutes = require('./routes/authRoutes')

// use the various middleware
app.use('/auth', authRoutes)
app.use(session({
    secret: KEY,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

module.exports = app