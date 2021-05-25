const express = require('express');

const authController = require('../../../controllers/api/v1/auth-controller');
const classroomsController = require('../../../controllers/api/v1/classrooms-controller');
const schoolsController = require('../../../controllers/api/v1/schools-controller');
const studentsController = require('../../../controllers/api/v1/students-controller');
const transportsController = require('../../../controllers/api/v1/transports-controller');
const ensureAuth = require('../../../middlewares/auth-api');

const router = express.Router();

router.post('/auth/login', authController.login);

router.get('/schools', ensureAuth, schoolsController.findAuthUserSchools);
router.get('/schools/:id', ensureAuth, schoolsController.findSchoolById);
router.get('/schools/:id/classrooms', ensureAuth, schoolsController.findSchoolClassrooms);

router.post('/classrooms', ensureAuth, classroomsController.save);
router.get('/classrooms/:id', ensureAuth, classroomsController.findOne);
router.patch('/classrooms/:id', ensureAuth, classroomsController.update);
router.delete('/classrooms/:id', ensureAuth, classroomsController.delete);
router.get('/classrooms/:id/students', ensureAuth, classroomsController.findClassroomStudents);

router.post('/students', ensureAuth, studentsController.save);
router.get('/students/:id', ensureAuth, studentsController.findOne);
router.put('/students/:id', ensureAuth, studentsController.update);
router.delete('/students/:id', ensureAuth, studentsController.delete);

router.get('/transports', ensureAuth, transportsController.findAll);

module.exports = router;
