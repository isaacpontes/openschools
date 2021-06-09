const Classroom = require('../models/classroom');
const Grade = require('../models/grade');
const School = require('../models/school');

module.exports = {
  // Render a list of all schools belonging to current user
  // GET /schools
  index: async function (req, res) {
    const currentUser = req.user._id;

    try {
      const schools = await School.find({ manager: currentUser });
      return res.status(200).render('schools/index', { schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render a single school
  // GET /schools/:id
  show: async function (req, res) {
    try {
      const school = await School.findById(req.params.id).populate('manager');
      const classrooms = await Classroom.find({ school: school._id }).populate('grade');
  
      return res.status(200).render('schools/show', { school, classrooms });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render the new classroom form
  // GET /schools/:id/addClassroom
  addClassroom: async function (req, res) {
    const classroom = new Classroom();
    classroom.school = req.params.id;

    try {
      const grades = await Grade.find({});

      return res.status(200).render('classrooms/new', { classroom, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
};
