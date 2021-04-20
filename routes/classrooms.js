const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const classroomsController = require('../controllers/classrooms-controller');

const router = express.Router({ mergeParams: true });

router.post('/', ensureAuthenticated, classroomsController.save);
router.get('/:id', ensureAuthenticated, classroomsController.show);
router.get('/:id/edit', ensureAuthenticated, classroomsController.edit);
router.put('/:id', ensureAuthenticated, classroomsController.update);
router.delete('/:id', ensureAuthenticated, classroomsController.delete);
router.get('/:id/addStudent', ensureAuthenticated, classroomsController.addStudent);

module.exports = router;
