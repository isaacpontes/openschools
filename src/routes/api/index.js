const express = require('express');

const AuthController = require('../../controllers/api/AuthController');
const { ensureAuth, ensureAdmin, ensureManager } = require('../../middlewares/auth-api');
const UserService = require('../../services/UserService');

const adminRouter = require('./admin');
const managerRouter = require('./manager');

const userService = new UserService();
const authController = new AuthController(userService);

const router = express.Router();

router.post('/auth/login', authController.login);

router.use('/admin', ensureAuth, ensureAdmin, adminRouter);
router.use('/manager', ensureAuth, ensureManager, managerRouter);

module.exports = router;
