const express = require('express');

const classroomsService = require('../services/classrooms-service');
const schoolsService = require('../services/schools-service');
const studentsService = require('../services/students-service');
const ClassroomsController = require('../controllers/manager/ClassroomsController');
const StudentsController = require('../controllers/manager/StudentsController');
const SchoolController = require('../controllers/manager/SchoolsController');

const classroomsController = new ClassroomsController(classroomsService);
const schoolsController = new SchoolController(schoolsService);
const studentsController = new StudentsController(studentsService);

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

router.get('/schools', schoolsController.index);
router.get('/schools/:id', schoolsController.show);
router.get('/schools/:id/add-classroom', schoolsController.addClassroom);

router.post('/students', studentsController.save);
router.get('/students/:id', studentsController.show);
router.get('/students/:id/edit', studentsController.edit);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

module.exports = router;
