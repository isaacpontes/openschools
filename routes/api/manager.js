const express = require('express');

const classroomsController = require('../../controllers/api/manager/classrooms-controller');
const schoolsController = require('../../controllers/api/manager/schools-controller');
const studentsController = require('../../controllers/api/manager/students-controller');
const transportsController = require('../../controllers/api/manager/transports-controller');

const router = express.Router();

router.get('/schools', schoolsController.findManagerSchools);
router.get('/schools/:id', schoolsController.findSchoolById);

router.post('/classrooms', classroomsController.save);
router.get('/classrooms/:id', classroomsController.findOne);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);
router.get('/classrooms/:id/students', classroomsController.findClassroomStudents);

router.post('/students', studentsController.save);
router.get('/students/:id', studentsController.findOne);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

router.get('/transports', transportsController.findAll);

module.exports = router;
