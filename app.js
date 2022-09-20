const mysql=require('mysql');
const express= require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const userprofile=require('./api/userprofile');
const signup=require('./api/signup');


app.use(flash());
app.use(bodyParser.json());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


app.use('/userprofile',userprofile);
app.use('/signup',signup)


module.exports = app
