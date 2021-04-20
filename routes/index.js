const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// Welcome and Login Page
// GET /
router.get('/', (req, res) => {
  res.render('pages/welcome');
});

// Dashboard Main Page
// GET /dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('pages/dashboard');
});

module.exports = router;
