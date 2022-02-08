const express = require('express');

const authController = require('../controllers/auth-controller');
const { ensureAuth, ensureAdmin, ensureManager } = require('../middlewares/jwt-auth');

const adminRouter = require('./admin');
const managerRouter = require('./manager');

const router = express.Router();

router.post('/auth/login', authController.login);

router.use('/admin', ensureAuth, ensureAdmin, adminRouter);
router.use('/manager', ensureAuth, ensureManager, managerRouter);

module.exports = router;
