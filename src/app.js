const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const { adminJs, adminJsRouter } = require('./adminjs');

// Express app
const app = express();

// AdminJS Dashboard
app.use(adminJs.options.rootPath, adminJsRouter);

// CORS
app.use(cors());

// Static Files
app.use(express.static('public'));

// JSON middleware
app.use(express.json());

// Morgan logs
app.use(morgan('dev'));

// Routes
app.use('/api', router);

module.exports = { app };
