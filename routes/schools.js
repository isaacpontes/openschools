const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const schoolController = require('../controllers/schools-controller');

const router = express.Router();

router.get('/', ensureAuthenticated, schoolController.index);
router.get('/:id', ensureAuthenticated, schoolController.show);
router.get('/:id/add-classroom', ensureAuthenticated, schoolController.addClassroom);

module.exports = router;
