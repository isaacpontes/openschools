const express = require('express');

const academicYearsController = require('../controllers/admin/academic-years-controller');
const classroomsController = require('../controllers/admin/classrooms-controller');
const employeesController = require('../controllers/admin/employees-controller');
const enrollmentsController = require('../controllers/admin/enrollments-controller');
const gradesController = require('../controllers/admin/grades-controller');
const schoolsController = require('../controllers/admin/schools-controller');
const sectorsController = require('../controllers/admin/sectors-controller');
const studentsController = require('../controllers/admin/students-controller');
const transportsController = require('../controllers/admin/transports-controller');
const usersController = require('../controllers/admin/users-controller');

const router = express.Router();

router.get('/sectors', sectorsController.index);
router.get('/sectors/:id', sectorsController.show);
router.post('/sectors', sectorsController.save);
router.put('/sectors/:id', sectorsController.update);
router.delete('/sectors/:id', sectorsController.delete);

router.get('/employees', employeesController.index);
router.get('/employees/:id', employeesController.show);
router.post('/employees', employeesController.save);
router.put('/employees/:id', employeesController.update);
router.delete('/employees/:id', employeesController.delete);

router.get('/grades', gradesController.index);
router.post('/grades', gradesController.save);
router.put('/grades/:id', gradesController.update);
router.delete('/grades/:id', gradesController.delete);

router.get('/transports', transportsController.index);
router.get('/transports/:id', transportsController.show);
router.post('/transports', transportsController.save);
router.put('/transports/:id', transportsController.update);
router.delete('/transports/:id', transportsController.delete);

router.get('/schools', schoolsController.index);
router.get('/schools/:id', schoolsController.show);
router.post('/schools', schoolsController.save);
router.put('/schools/:id', schoolsController.update);
router.delete('/schools/:id', schoolsController.delete);

router.get('/classrooms', classroomsController.index);
router.get('/classrooms/:id', classroomsController.show);
router.post('/classrooms', classroomsController.save);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);

router.get('/students', studentsController.index);
router.get('/students/:id', studentsController.show);
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

router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.post('/users', usersController.save);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

module.exports = router;
