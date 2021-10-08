const express = require('express');
const { auth, authAdmin, authManager } = require('../middlewares/auth');

const authRoutes = require('./auth');
const managerRoutes = require('./manager');
const adminRoutes = require('./admin');

const router = express.Router();

// Login Page
// GET /
router.get('/', (req, res) => {
  return req.isAuthenticated() ? res.redirect('/home') : res.render('pages/login');
});

router.get('/home', auth, (req, res) => {
  const { role } = req.user;
  return res.redirect(`/${role}`);
})

router.use('/auth', authRoutes);
router.use('/manager', auth, authManager, managerRoutes);
router.use('/admin', auth, authAdmin, adminRoutes);

module.exports = router;
