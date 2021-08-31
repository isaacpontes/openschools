const gradesService = require("../../services/grades-service");

class SchoolsController {
  constructor (service) {
    this.service = service;
  }
  
  // Render a list of all schools belonging to current user
  // GET /schools
  index = async (req, res) => {
    const currentUser = req.user._id;

    try {
      const schools = await this.service.findByManager(currentUser);
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
      const school = await this.service.findById(id, { path: 'manager' });
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
      const grades = await gradesService.findAll();

      return res.render('manager/schools/add-classroom', { schoolId, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
}

module.exports = SchoolsController;
