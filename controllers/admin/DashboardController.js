const Controller = require('../Controller');
const SectorsService = require("../../services/SectorsService");
const SchoolsService = require('../../services/SchoolsService');
const GradesService = require('../../services/GradesService');

class DashboardController extends Controller {
  // Render the dashboard page
  // GET /admin
  index = async (req, res) => {
    const gradesService = new GradesService();
    const schoolsService = new SchoolsService();
    const sectorsService = new SectorsService();

    try {
      const gradesWithStudentsCount = await gradesService.getStudentsCountByGrade();
      const schoolsWithStudentsCount = await schoolsService.getStudentsCountBySchool();
      const sectorsWithEmployeesCount = await sectorsService.getEmployeesCountBySector();

      return res.render('admin/dashboard', {
        gradesWithStudentsCount,
        schoolsWithStudentsCount,
        sectorsWithEmployeesCount
      });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }
}

module.exports = DashboardController;
