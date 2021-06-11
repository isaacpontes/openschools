const express = require('express');
const { ensureAdmin } = require('../middlewares/auth');
const classroomsController = require('../controllers/admin/classrooms-controller');
const dashboardController = require('../controllers/admin/dashboard-controller');
const employeesController = require('../controllers/admin/employees-controller');
const schoolController = require('../controllers/admin/schools-controller');
const sectorsController = require('../controllers/admin/sectors-controller');
const studentsController = require('../controllers/admin/students-controller');
const transportsController = require('../controllers/admin/transports-controller');
const usersController = require('../controllers/admin/users-controller');
const gradesController = require('../controllers/admin/grades-controller');

const router = express.Router();

router.get('/', ensureAdmin, dashboardController.index);

router.get('/classrooms', ensureAdmin, classroomsController.index);
router.post('/classrooms', ensureAdmin, classroomsController.save);
router.get('/classrooms/new', ensureAdmin, classroomsController.new);
router.get('/classrooms/:id', ensureAdmin, classroomsController.show);
router.get('/classrooms/:id/edit', ensureAdmin, classroomsController.edit);
router.put('/classrooms/:id', ensureAdmin, classroomsController.update);
router.delete('/classrooms/:id', ensureAdmin, classroomsController.delete);

router.get('/employees', ensureAdmin, employeesController.index);
router.post('/employees', ensureAdmin, employeesController.save);
router.get('/employees/new', ensureAdmin, employeesController.new);
router.get('/employees/:id', ensureAdmin, employeesController.show);
router.get('/employees/:id/edit', ensureAdmin, employeesController.edit);
router.put('/employees/:id', ensureAdmin, employeesController.update);
router.delete('/employees/:id', ensureAdmin, employeesController.delete);

router.get('/grades', ensureAdmin, gradesController.index);
router.post('/grades', ensureAdmin, gradesController.save);
router.put('/grades/:id', ensureAdmin, gradesController.update);
router.delete('/grades/:id', ensureAdmin, gradesController.delete);

router.get('/schools', ensureAdmin, schoolController.index);
router.post('/schools', ensureAdmin, schoolController.save);
router.get('/schools/new', ensureAdmin, schoolController.new);
router.get('/schools/:id', ensureAdmin, schoolController.show);
router.get('/schools/:id/edit', ensureAdmin, schoolController.edit);
router.put('/schools/:id', ensureAdmin, schoolController.update);
router.delete('/schools/:id', ensureAdmin, schoolController.delete);

router.get('/sectors', ensureAdmin, sectorsController.index);
router.post('/sectors', ensureAdmin, sectorsController.save);
router.get('/sectors/new', ensureAdmin, sectorsController.new);
router.get('/sectors/:id/edit', ensureAdmin, sectorsController.edit);
router.put('/sectors/:id', ensureAdmin, sectorsController.update);
router.delete('/sectors/:id', ensureAdmin, sectorsController.delete);

router.get('/students', ensureAdmin, studentsController.index);
router.post('/students', ensureAdmin, studentsController.save);
router.get('/students/new', ensureAdmin, studentsController.new);
router.get('/students/:id', ensureAdmin, studentsController.show);
router.get('/students/:id/edit', ensureAdmin, studentsController.edit);
router.put('/students/:id', ensureAdmin, studentsController.update);
router.delete('/students/:id', ensureAdmin, studentsController.delete);

router.get('/transports', ensureAdmin, transportsController.index);
router.post('/transports', ensureAdmin, transportsController.save);
router.get('/transports/new', ensureAdmin, transportsController.new);
router.get('/transports/:id/edit', ensureAdmin, transportsController.edit);
router.put('/transports/:id', ensureAdmin, transportsController.update);
router.delete('/transports/:id', ensureAdmin, transportsController.delete);

router.get('/users', ensureAdmin, usersController.index);
router.post('/users', ensureAdmin, usersController.save);
router.get('/users/new', ensureAdmin, usersController.new);
router.get('/users/:id/edit', ensureAdmin, usersController.edit);
router.put('/users/:id', ensureAdmin, usersController.update);
router.delete('/users/:id', ensureAdmin, usersController.delete);

module.exports = router;
