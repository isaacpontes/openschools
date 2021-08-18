const express = require('express');

const classroomsController = require('../controllers/manager/classrooms-controller');
const schoolController = require('../controllers/manager/schools-controller');
const studentsController = require('../controllers/manager/students-controller');

const router = express.Router({ mergeParams: true });

// Home Main Page
// GET /home
router.get('/', (req, res) => {
  return res.render('pages/home');
});

router.get('/classrooms', classroomsController.index);
router.post('/classrooms', classroomsController.save);
router.get('/classrooms/:id', classroomsController.show);
router.get('/classrooms/:id/edit', classroomsController.edit);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);
router.get('/classrooms/:id/add-student', classroomsController.addStudent);

router.get('/schools', schoolController.index);
router.get('/schools/:id', schoolController.show);
router.get('/schools/:id/add-classroom', schoolController.addClassroom);

router.post('/students', studentsController.save);
router.get('/students/:id', studentsController.show);
router.get('/students/:id/edit', studentsController.edit);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

module.exports = router;
