const express = require('express');

const classroomsController = require('../controllers/manager/classrooms-controller');
const schoolsController = require('../controllers/manager/schools-controller');
const studentsController = require('../controllers/manager/students-controller');
const transportsController = require('../controllers/manager/transports-controller');

const router = express.Router();

router.get('/schools', schoolsController.index);
router.get('/schools/:id', schoolsController.show);
router.post('/schools/:id/classrooms', schoolsController.addClassroom);

router.get('/classrooms', classroomsController.index);
router.post('/classrooms', classroomsController.save);
router.get('/classrooms/:id', classroomsController.show);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);

router.get('/students', studentsController.index);
router.get('/students/:id', studentsController.show);
router.post('/students', studentsController.save);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

router.get('/enrolled-students', studentsController.enrolledStudents);

router.get('/transports', transportsController.index);

module.exports = router;
