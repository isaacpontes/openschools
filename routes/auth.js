const express = require('express');
const passport = require('passport');
const router = express.Router();

// Handle Login
// POST /auth/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

// Handle Logout
// GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Sessão encerrada.');
  res.redirect('/');
});

module.exports = router;