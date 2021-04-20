const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const schoolController = require('../controllers/schools-controller');

const router = express.Router();

router.get('/', ensureAuthenticated, schoolController.index);
router.post('/', ensureAuthenticated, schoolController.save);
router.get('/new', ensureAuthenticated, schoolController.new);
router.get('/:id', ensureAuthenticated, schoolController.show);
router.get('/:id/edit', ensureAuthenticated, schoolController.edit);
router.put('/:id', ensureAuthenticated, schoolController.update);
router.delete('/:id', ensureAuthenticated, schoolController.delete);
router.get('/:id/addClassroom', ensureAuthenticated, schoolController.addClassroom);

module.exports = router;
