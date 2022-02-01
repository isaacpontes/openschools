require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('cookie-session');
const sessionOptions = require('./config/session');
const setFlashMessages = require('./middlewares/flash-messages');
const passportLocal = require('./config/passport');
const appRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const { adminJs, adminJsRouter } = require('./config/adminjs')

// Express app
const app = express();

// Passport config
passportLocal(passport);

// EJS as View Engine
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');
app.use(adminJs.options.rootPath, adminJsRouter)

// Static Files
app.use(express.static('public'));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// JSON middleware
app.use(express.json());

// Express Session
app.use(session(sessionOptions));

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
app.use('/', appRouter);
app.use('/api', apiRouter);

module.exports = { app };
