const express = require( "express");

const ClassroomsService = require( "../../services/ClassroomsService");
const EmployeesService = require( "../../services/EmployeesService");
const GradesService = require( "../../services/GradesService");
const SchoolsService = require( "../../services/SchoolsService");
const SectorsService = require( "../../services/SectorsService");
const StudentsService = require( "../../services/StudentsService");
const TransportsService = require( "../../services/TransportsService");
const UsersService = require( "../../services/UsersService");

const ClassroomsController = require( "../../controllers/api/admin/ClassroomsController");
const EmployeesController = require( "../../controllers/api/admin/EmployeesController");
const GradesController = require( "../../controllers/api/admin/GradesController");
const SchoolsController = require( "../../controllers/api/admin/SchoolsController");
const SectorsController = require( "../../controllers/api/admin/SectorsController");
const StudentsController = require( "../../controllers/api/admin/StudentsController");
const TransportsController = require( "../../controllers/api/admin/TransportsController");
const UsersController = require( "../../controllers/api/admin/UsersController");

const classroomsService = new ClassroomsService();
const employeesService = new EmployeesService();
const gradesService = new GradesService();
const schoolsService = new SchoolsService();
const sectorsService = new SectorsService();
const studentsService = new StudentsService();
const transportsService = new TransportsService();
const usersService = new UsersService();

const classroomsController = new ClassroomsController(classroomsService, studentsService);
const employeesController = new EmployeesController(employeesService);
const gradesController = new GradesController(gradesService);
const schoolsController = new SchoolsController(schoolsService);
const sectorsController = new SectorsController(sectorsService);
const studentsController = new StudentsController(studentsService);
const transportsController = new TransportsController(transportsService);
const usersController = new UsersController(usersService);

const router = express.Router();

router.get('/sectors', sectorsController.findAll);
router.get('/sectors/:id', sectorsController.findById);
router.post('/sectors', sectorsController.save);
router.put('/sectors/:id', sectorsController.update);
router.delete('/sectors/:id', sectorsController.delete);

router.get('/employees', employeesController.findAll);
router.get('/employees/:id', employeesController.findById);
router.post('/employees', employeesController.save);
router.put('/employees/:id', employeesController.update);
router.delete('/employees/:id', employeesController.delete);

router.get('/grades', gradesController.findAll);
router.post('/grades', gradesController.save);
router.put('/grades/:id', gradesController.update);
router.delete('/grades/:id', gradesController.delete);

router.get('/transports', transportsController.findAll);
router.get('/transports/:id', transportsController.findById);
router.post('/transports', transportsController.save);
router.put('/transports/:id', transportsController.update);
router.delete('/transports/:id', transportsController.delete);

router.get('/schools', schoolsController.findAll);
router.get('/schools/:id', schoolsController.findById);
router.post('/schools', schoolsController.save);
router.put('/schools/:id', schoolsController.update);
router.delete('/schools/:id', schoolsController.delete);

router.get('/classrooms', classroomsController.findAll);
router.get('/classrooms/:id', classroomsController.findById);
router.post('/classrooms', classroomsController.save);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);

router.get('/students', studentsController.findAll);
router.get('/students/:id', studentsController.findById);
router.post('/students', studentsController.save);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

router.get('/users', usersController.findAll);
router.get('/users/:id', usersController.findById);
router.post('/users', usersController.save);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

module.exports = router;
