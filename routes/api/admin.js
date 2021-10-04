const express = require( "express");

const AcademicYearsService = require('../../services/AcademicYearService');
const ClassroomService = require( "../../services/ClassroomService");
const EmployeeService = require( "../../services/EmployeeService");
const EnrollmentService = require( "../../services/EnrollmentService");
const GradeService = require( "../../services/GradeService");
const SchoolService = require( "../../services/SchoolService");
const SectorService = require( "../../services/SectorService");
const StudentService = require( "../../services/StudentService");
const TransportService = require( "../../services/TransportService");
const UserService = require( "../../services/UserService");

const AcademicYearsController = require('../../controllers/api/admin/AcademicYearsController');
const ClassroomsController = require( "../../controllers/api/admin/ClassroomsController");
const EmployeesController = require( "../../controllers/api/admin/EmployeesController");
const EnrollmentsController = require( "../../controllers/api/admin/EnrollmentsController");
const GradesController = require( "../../controllers/api/admin/GradesController");
const SchoolsController = require( "../../controllers/api/admin/SchoolsController");
const SectorsController = require( "../../controllers/api/admin/SectorsController");
const StudentsController = require( "../../controllers/api/admin/StudentsController");
const TransportsController = require( "../../controllers/api/admin/TransportsController");
const UsersController = require( "../../controllers/api/admin/UsersController");

const academicYearsService = new AcademicYearsService();
const classroomService = new ClassroomService();
const employeeService = new EmployeeService();
const enrollmentService = new EnrollmentService();
const gradeService = new GradeService();
const schoolService = new SchoolService();
const sectorService = new SectorService();
const studentService = new StudentService();
const transportService = new TransportService();
const userService = new UserService();

const academicYearsController = new AcademicYearsController(academicYearsService);
const classroomsController = new ClassroomsController(classroomService, studentService);
const employeesController = new EmployeesController(employeeService);
const enrollmentsController = new EnrollmentsController(enrollmentService);
const gradesController = new GradesController(gradeService);
const schoolsController = new SchoolsController(schoolService);
const sectorsController = new SectorsController(sectorService);
const studentsController = new StudentsController(studentService);
const transportsController = new TransportsController(transportService);
const usersController = new UsersController(userService);

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

router.get('/academic-years', academicYearsController.index);
router.post('/academic-years', academicYearsController.save);
router.put('/academic-years/:id', academicYearsController.update);
router.delete('/academic-years/:id', academicYearsController.delete);

router.get('/enrollments', enrollmentsController.index);
router.post('/enrollments', enrollmentsController.save);
router.put('/enrollments/:id', enrollmentsController.update);
router.delete('/enrollments/:id', enrollmentsController.delete);

router.get('/users', usersController.findAll);
router.get('/users/:id', usersController.findById);
router.post('/users', usersController.save);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

module.exports = router;
