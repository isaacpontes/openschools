const Classroom = require('../../models/classroom');
const Grade = require('../../models/grade');
const School = require('../../models/school');
const classroomsService = require('../../services/classrooms-service');
const gradesService = require('../../services/grades-service');
const schoolsService = require('../../services/schools-service');

module.exports = {
  // Render a list of all schools belonging to current user
  // GET /schools
  index: async function (req, res) {
    const currentUser = req.user._id;

    try {
      const schools = await schoolsService.findByManager(currentUser);
      return res.status(200).render('schools/index', { schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render a single school
  // GET /schools/:id
  show: async function (req, res) {
    const { id } = req.params;

    try {
      const school = await schoolsService.findById(id, { path: 'manager' });
      return res.status(200).render('schools/show', { school });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render the new classroom form
  // GET /schools/:id/addClassroom
  addClassroom: async function (req, res) {
    const classroom = classroomsService.create();
    classroom.school = req.params.id;

    try {
      const grades = await gradesService.findAll();
      return res.status(200).render('classrooms/new', { classroom, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
};
