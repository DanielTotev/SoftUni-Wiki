const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    //View engine
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
    app.set('view engine', '.hbs');
    //Static files
    app.use(express.static('public'));
    //Cookies
    app.use(cookieParser());
    //Form parser
    app.use(bodyParser.urlencoded({ extended: true }));
    //Passport
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: false, saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('public'));
    app.use((req, res, next) => {
        if (req.user) {
          res.locals.currentUser = req.user;
        }
        next();
    })
    
    console.log('Express ready!');
};