const GradeService = require("../../services/GradeService");
const SchoolService = require('../../services/SchoolService');

class SchoolsController {
  // Render a list of all schools belonging to current user
  // GET /schools
  index = async (req, res) => {
    const currentUser = req.user.id;

    try {
      const schools = await SchoolService.findByManager(currentUser);
      return res.status(200).render('manager/schools/index', { schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Render a single school
  // GET /schools/:id
  show = async (req, res) => {
    const { id } = req.params;

    try {
      const school = await SchoolService.findByIdWithClassrooms(id);
      return res.status(200).render('manager/schools/show', { school });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Render the new classroom form
  // GET /schools/:id/add-classroom
  addClassroom = async (req, res) => {
    const schoolId = req.params.id;

    try {
      const grades = await GradeService.findAll();

      return res.render('manager/schools/add-classroom', { schoolId, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
}

module.exports = SchoolsController;
