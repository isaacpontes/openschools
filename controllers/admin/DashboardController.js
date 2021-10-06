const Controller = require('../Controller');
const SectorService = require("../../services/SectorService");
const SchoolService = require('../../services/SchoolService');
const GradeService = require('../../services/GradeService');

class DashboardController extends Controller {
  // Render the dashboard page
  // GET /admin
  index = async (req, res) => {
    const gradeService = new GradeService();
    const schoolService = new SchoolService();
    const sectorService = new SectorService();

    try {
      const gradesWithStudentsCount = await gradeService.getStudentsCountByGrade();
      const schoolsWithStudentsCount = await schoolService.getStudentsCountBySchool();
      const sectorsWithEmployeesCount = await sectorService.getEmployeesCountBySector();

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
