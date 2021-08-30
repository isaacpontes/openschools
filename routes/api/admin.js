const express = require('express');
const classroomsController = require('../../controllers/api/admin/classrooms-controller');
const employeesController = require('../../controllers/api/admin/employees-controller');
const gradesController = require('../../controllers/api/admin/grades-controller');
const schoolsController = require('../../controllers/api/admin/schools-controller');
const sectorsController = require('../../controllers/api/admin/sectors-controller');
const studentsController = require('../../controllers/api/admin/students-controller');
const transportsController = require('../../controllers/api/admin/transports-controller');
const usersController = require('../../controllers/api/admin/users-controller');

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
