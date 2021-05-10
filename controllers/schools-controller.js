const Classroom = require('../models/classroom');
const School = require('../models/school');

module.exports = {
  // Render a list of all schools belonging to current user
  // GET /schools
  index: async function (req, res) {
    const currentUser = req.user._id;

    try {
      const schools = await School.find({ manager: currentUser });
      res.status(200).render('schools/index', { schools });
    } catch (error) {
      res.status(400).render('pages/error', { error: 'Erro ao carregar lista de escolas.' });
    }
  },

  // Render a single school
  // GET /schools/:id
  show: async function (req, res) {
    try {
      const school = await School.findById(req.params.id).populate('manager');
      const classrooms = await Classroom.find({ school: school._id });
  
      res.status(200).render('schools/show', { school, classrooms });
    } catch (error) {
      res.status(400).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render the new classroom form
  // GET /schools/:id/addClassroom
  addClassroom: async function (req, res) {
    try {
      const classroom = new Classroom();
      classroom.school = req.params.id;

      res.status(200).render('classrooms/new', { classroom });
    } catch (error) {
      res.status(400).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  }
};
