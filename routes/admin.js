const express = require('express');

const classroomsController = require('../controllers/admin/classrooms-controller');
const dashboardController = require('../controllers/admin/dashboard-controller');
const employeesController = require('../controllers/admin/employees-controller');
const schoolController = require('../controllers/admin/schools-controller');
const sectorsController = require('../controllers/admin/sectors-controller');
const StudentsController = require('../controllers/admin/StudentsController');
const TransportsService = require('../services/TransportsService');
const TransportsController = require('../controllers/admin/TransportsController');
const usersController = require('../controllers/admin/users-controller');
const gradesController = require('../controllers/admin/grades-controller');

const transportsService = new TransportsService();
const studentsController = new StudentsController(transportsService);
const transportsController = new TransportsController(transportsService);

const router = express.Router();

router.get('/', dashboardController.index);

router.get('/classrooms', classroomsController.index);
router.post('/classrooms', classroomsController.save);
router.get('/classrooms/new', classroomsController.new);
router.get('/classrooms/:id', classroomsController.show);
router.get('/classrooms/:id/edit', classroomsController.edit);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);

router.get('/employees', employeesController.index);
router.post('/employees', employeesController.save);
router.get('/employees/new', employeesController.new);
router.get('/employees/:id', employeesController.show);
router.get('/employees/:id/edit', employeesController.edit);
router.put('/employees/:id', employeesController.update);
router.delete('/employees/:id', employeesController.delete);

router.get('/grades', gradesController.index);
router.post('/grades', gradesController.save);
router.put('/grades/:id', gradesController.update);
router.delete('/grades/:id', gradesController.delete);

router.get('/schools', schoolController.index);
router.post('/schools', schoolController.save);
router.get('/schools/new', schoolController.new);
router.get('/schools/:id', schoolController.show);
router.get('/schools/:id/edit', schoolController.edit);
router.put('/schools/:id', schoolController.update);
router.delete('/schools/:id', schoolController.delete);

router.get('/sectors', sectorsController.index);
router.post('/sectors', sectorsController.save);
router.get('/sectors/new', sectorsController.new);
router.get('/sectors/:id/edit', sectorsController.edit);
router.put('/sectors/:id', sectorsController.update);
router.delete('/sectors/:id', sectorsController.delete);

router.get('/students', studentsController.index);
router.post('/students', studentsController.save);
router.get('/students/new', studentsController.create);
router.get('/students/export-pdf', studentsController.exportPdf);
router.get('/students/:id', studentsController.show);
router.get('/students/:id/edit', studentsController.edit);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

router.get('/transports', transportsController.index);
router.post('/transports', transportsController.save);
router.get('/transports/new', transportsController.create);
router.get('/transports/:id/edit', transportsController.edit);
router.put('/transports/:id', transportsController.update);
router.delete('/transports/:id', transportsController.delete);

router.get('/users', usersController.index);
router.post('/users', usersController.save);
router.get('/users/new', usersController.new);
router.get('/users/:id/edit', usersController.edit);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

module.exports = router;
