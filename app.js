const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport config
const passport = require('passport');
require('./config/passport')(passport);

// Database configuration and connection
require('./config/database');

// Static Files
app.use(express.static('public'));

// EJS layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(session({
  secret: 'a secure secret',
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
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Method Override
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// Morgan logs
app.use(morgan('dev'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/schools', require('./routes/schools'));
app.use('/schools/:schoolId/classrooms', require('./routes/classrooms'));
app.use('/transports', require('./routes/transports'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started successfully at port ${PORT}`));
