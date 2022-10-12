const mysql=require('mysql');
const express= require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const userprofile=require('../app/api/userprofile');
const signup=require('../app/api/signup');
//const validation=require('./validation');
const router=require('../app/api/router');
const indexRouter = require('../app/api/router');


app.use(flash());
app.use(bodyParser.json());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


app.use('/userprofile',userprofile);
app.use('/signup',signup);
//app.use('/validation',validation);
app.use('/router',router);
app.use('/api', indexRouter);


module.exports = app
