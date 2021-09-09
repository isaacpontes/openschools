const express = require('express');
const ClassroomsService = require( "../../services/ClassroomsService");
const SchoolsService = require( "../../services/SchoolsService");
const StudentsService = require( "../../services/StudentsService");
const ClassroomsController = require( "../../controllers/api/manager/ClassroomsController");
const SchoolsController = require( "../../controllers/api/manager/SchoolsController");
const StudentsController = require( "../../controllers/api/manager/StudentsController");
const TransportsService = require('../../services/TransportsService');
const TransportsController = require('../../controllers/api/manager/TransportsController');

const classroomsService = new ClassroomsService();
const schoolsService = new SchoolsService();
const studentsService = new StudentsService();
const transportsService = new TransportsService();

const classroomsController = new ClassroomsController(classroomsService, studentsService);
const schoolsController = new SchoolsController(schoolsService);
const studentsController = new StudentsController(studentsService, schoolsService);
const transportsController = new TransportsController(transportsService);

const router = express.Router();

router.get('/schools', schoolsController.findManagerSchools);
router.get('/schools/:id', schoolsController.findSchoolById);

router.post('/classrooms', classroomsController.save);
router.get('/classrooms/:id', classroomsController.findOne);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);
router.get('/classrooms/:id/students', classroomsController.findClassroomStudents);

router.get('/students', studentsController.index);
router.post('/students', studentsController.save);
router.get('/students/:id', studentsController.findOne);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

router.get('/transports', transportsController.findAll);

module.exports = router;
