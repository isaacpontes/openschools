require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/api');
const { adminJs, adminJsRouter } = require('./config/adminjs');

// Express app
const app = express();

// AdminJS Dashboard
app.use(adminJs.options.rootPath, adminJsRouter);

// Static Files
app.use(express.static('public'));

// JSON middleware
app.use(express.json());

// Morgan logs
app.use(morgan('dev'));

// Routes
app.use('/api', apiRouter);

module.exports = { app };
