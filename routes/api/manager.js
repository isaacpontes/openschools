const express = require('express');
const ClassroomService = require( "../../services/ClassroomService");
const SchoolService = require( "../../services/SchoolService");
const StudentService = require( "../../services/StudentService");
const ClassroomsController = require( "../../controllers/api/manager/ClassroomsController");
const SchoolsController = require( "../../controllers/api/manager/SchoolsController");
const StudentsController = require( "../../controllers/api/manager/StudentsController");
const TransportService = require('../../services/TransportService');
const TransportsController = require('../../controllers/api/manager/TransportsController');

const classroomService = new ClassroomService();
const schoolService = new SchoolService();
const studentService = new StudentService();
const transportService = new TransportService();

const classroomsController = new ClassroomsController(classroomService, studentService);
const schoolsController = new SchoolsController(schoolService);
const studentsController = new StudentsController(studentService, schoolService);
const transportsController = new TransportsController(transportService);

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
