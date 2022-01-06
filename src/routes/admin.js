const express = require('express');

const AcademicYearsController = require('../controllers/admin/AcademicYearsController');
const ClassroomsController = require('../controllers/admin/ClassroomsController');
const DashboardController = require('../controllers/admin/DashboardController');
const EmployeesController = require('../controllers/admin/EmployeesController');
const EnrollmentsController = require('../controllers/admin/EnrollmentsController');
const GradesController = require('../controllers/admin/GradesController');
const SchoolsController = require('../controllers/admin/SchoolsController');
const SectorsController = require('../controllers/admin/SectorsController');
const StudentsController = require('../controllers/admin/StudentsController');
const TransportsController = require('../controllers/admin/TransportsController');
const UsersController = require('../controllers/admin/UsersController');

const academicYearsController = new AcademicYearsController();
const classroomsController = new ClassroomsController();
const dashboardController = new DashboardController();
const employeesController = new EmployeesController();
const enrollmentsController = new EnrollmentsController();
const gradesController = new GradesController();
const schoolsController = new SchoolsController();
const sectorsController = new SectorsController();
const studentsController = new StudentsController();
const transportsController = new TransportsController();
const usersController = new UsersController();

const router = express.Router();

router.get('/', dashboardController.index);

router.get('/classrooms', classroomsController.index);
router.post('/classrooms', classroomsController.save);
router.get('/classrooms/create', classroomsController.create);
router.get('/classrooms/:id', classroomsController.show);
router.get('/classrooms/:id/edit', classroomsController.edit);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);

router.get('/employees', employeesController.index);
router.post('/employees', employeesController.save);
router.get('/employees/create', employeesController.create);
router.get('/employees/:id', employeesController.show);
router.get('/employees/:id/edit', employeesController.edit);
router.put('/employees/:id', employeesController.update);
router.delete('/employees/:id', employeesController.delete);

router.get('/academic-years', academicYearsController.index);
router.post('/academic-years', academicYearsController.save);
router.put('/academic-years/:id', academicYearsController.update);
router.delete('/academic-years/:id', academicYearsController.delete);

router.get('/grades', gradesController.index);
router.post('/grades', gradesController.save);
router.put('/grades/:id', gradesController.update);
router.delete('/grades/:id', gradesController.delete);

router.get('/schools', schoolsController.index);
router.post('/schools', schoolsController.save);
router.get('/schools/create', schoolsController.create);
router.get('/schools/:id', schoolsController.show);
router.get('/schools/:id/edit', schoolsController.edit);
router.put('/schools/:id', schoolsController.update);
router.delete('/schools/:id', schoolsController.delete);

router.get('/sectors', sectorsController.index);
router.post('/sectors', sectorsController.save);
router.get('/sectors/create', sectorsController.create);
router.get('/sectors/:id/edit', sectorsController.edit);
router.put('/sectors/:id', sectorsController.update);
router.delete('/sectors/:id', sectorsController.delete);

router.get('/students', studentsController.index);
router.get('/students/create', studentsController.create);
router.get('/students/export-pdf', studentsController.exportPdf);
router.get('/students/:id', studentsController.show);
router.get('/students/:id/edit', studentsController.edit);
router.get('/students/:id/enroll', studentsController.enrollForm);
router.post('/students', studentsController.save);
router.post('/students/:id/enroll', studentsController.enroll);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

router.get('/transports', transportsController.index);
router.post('/transports', transportsController.save);
router.get('/transports/create', transportsController.create);
router.get('/transports/:id/edit', transportsController.edit);
router.put('/transports/:id', transportsController.update);
router.delete('/transports/:id', transportsController.delete);

router.get('/users', usersController.index);
router.post('/users', usersController.save);
router.get('/users/create', usersController.create);
router.get('/users/:id/edit', usersController.edit);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

router.get('/enrollments', enrollmentsController.index);

module.exports = router;