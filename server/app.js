const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('./auth/local');
const jwtStrategy = require('./auth/jwt');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // use x-www-form-urlencoded used for processing submitted forms from the front end app
app.use(bodyParser.json()); // parse json bodies that come in from the front end app
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // THIS ALLOWS ACCEPTING EMBER DATA BECAUSE JSON API FORMAT
app.use(expressValidator());
app.use(morgan('common'));
app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

require('./routes')(app);

module.exports = app;
