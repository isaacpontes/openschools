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
const Database = require('./database');
const appRouter = require('./routes/index')
const apiRouter = require('./routes/api')

class App {
  constructor() {
    // Express app
    this.express = express();

    // Passport config
    passportLocal(passport);
    
    // EJS as View Engine
    this.express.set('views', path.join(__dirname, 'resources/views'));
    this.express.set('view engine', 'ejs');

    this.defineMiddlewares();

    // Database instace
    this.database = new Database({
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      options: {
        define: { timestamps: true, underscored: true }
      }
    });

    this.connectDatabase();
  }

  connectDatabase() {
    this.database.connect()
      .then(() => {
        this.database.initSequelize();
        this.database.createFirstAdminUser();
      });
  }

  defineMiddlewares() {
    // Static Files
    this.express.use(express.static('public'));
    
    // Body Parser
    this.express.use(express.urlencoded({ extended: true }));
    
    // JSON middleware
    this.express.use(express.json());
    
    // Express Session
    this.express.use(session(sessionOptions));
    
    // Passport middleware
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    
    // Flash messages middleware
    this.express.use(flash());
    
    // Global variables for controlling messages
    this.express.use(setFlashMessages);
    
    // Method Override
    this.express.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
    
    // Morgan logs
    this.express.use(morgan('dev'));
    
    // Routes
    this.express.use('/', appRouter);
    this.express.use('/api', apiRouter);
  }

  start(port, callbackfn) {
    this.express.listen(port, callbackfn)
  }
}

module.exports = { App };
