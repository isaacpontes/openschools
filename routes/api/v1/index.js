const express = require('express');

const authController = require('../../../controllers/api/v1/auth-controller');
const schoolsController = require('../../../controllers/api/v1/schools-controller');
const ensureAuth = require('../../../middlewares/auth');

const router = express.Router();

router.post('/auth/login', authController.login);

router.get('/schools', ensureAuth, schoolsController.findAuthUserSchools);
router.get('/schools/:id', ensureAuth, schoolsController.findSchoolById);

module.exports = router;
