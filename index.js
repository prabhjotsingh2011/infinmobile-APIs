const express = require('express');
const DbConnect = require('./database')
const router = require('./router')
var bodyParser = require('body-parser')
const google_Passport_setup = require('./config/google-passport-setup')
const facebook_passport_setup = require('./config/facebook-passport-setup')
const cookieSession= require('cookie-session')
require("dotenv").config();
const app = express();

var session = require('express-session');
var passport = require('passport');


app.use(cookieSession({
    name: 'session for google auth',
    maxAge: 24*60*60*1000,
    keys: ['key1', 'key2']
    }));

app.use(passport.initialize());
app.use(passport.session());

DbConnect()

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/failed', (req, res) => {
    res.send("  failed");
});

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
app.get('/passed',isLoggedIn, (req, res) => {
    res.send(" passed-  logged in successfully");
});


// app.set('view engine', 'ejs');

app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(router)



app.listen(4000, () => {
    console.log('server started at 4000');
})



