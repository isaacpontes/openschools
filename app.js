require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const setFlashMessages = require('./middlewares/flash-messages');
const passportLocal = require('./config/passport');

const app = express();

// Passport config
passportLocal(passport);

// Static Files
app.use(express.static('public'));

// EJS as View Engine
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({ extended: true }));

// JSON middleware
app.use(express.json());

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages middleware
app.use(flash());

// Global variables for controlling messages
app.use(setFlashMessages);

// Method Override
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// Morgan logs
app.use(morgan('dev'));

// Routes
app.use('/', require('./routes/index'));

// API routes
app.use('/api/v1', require('./routes/api/v1'));

module.exports = { app };
