const express = require('express');

const AuthController = require('../../controllers/api/AuthController');
const { ensureAuth, ensureAdmin, ensureManager } = require('../../middlewares/auth-api');
const usersService = require('../../services/users-service');

const adminRouter = require('./admin');
const managerRouter = require('./manager');

const authController = new AuthController(usersService);

const router = express.Router();

router.post('/auth/login', authController.login);

router.use('/admin', ensureAuth, ensureAdmin, adminRouter);
router.use('/manager', ensureAuth, ensureManager, managerRouter);

module.exports = router;
