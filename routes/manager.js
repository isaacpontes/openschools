const express = require('express');

const ClassroomsController = require('../controllers/manager/ClassroomsController');
const StudentsController = require('../controllers/manager/StudentsController');
const SchoolController = require('../controllers/manager/SchoolsController');

const classroomsController = new ClassroomsController();
const schoolsController = new SchoolController();
const studentsController = new StudentsController();

const router = express.Router({ mergeParams: true });

// Home Main Page
// GET /home
router.get('/', (req, res) => {
  return res.render('pages/home');
});

router.get('/classrooms', classroomsController.index);
router.post('/classrooms', classroomsController.save);
router.get('/classrooms/:id', classroomsController.show);
router.get('/classrooms/:id/edit', classroomsController.edit);
router.put('/classrooms/:id', classroomsController.update);
router.delete('/classrooms/:id', classroomsController.delete);

router.get('/schools', schoolsController.index);
router.get('/schools/:id', schoolsController.show);
router.get('/schools/:id/add-classroom', schoolsController.addClassroom);

router.get('/students', studentsController.index);
router.post('/students', studentsController.save);
router.get('/students/create', studentsController.create);
router.get('/students/:id', studentsController.show);
router.get('/students/:id/enroll', studentsController.enrollForm);
router.post('/students/:id/enroll', studentsController.enroll);
// router.get('/students/:id/edit', studentsController.edit);
// router.put('/students/:id', studentsController.update);

module.exports = router;
