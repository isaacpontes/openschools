const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// Welcome and Login Page
// GET /
router.get('/', (req, res) => {
  return res.render('pages/welcome');
});

// Dashboard Main Page
// GET /dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user.role === 'admin') {
    return res.redirect('/admin');
  }

  return res.render('pages/dashboard');
});

module.exports = router;
