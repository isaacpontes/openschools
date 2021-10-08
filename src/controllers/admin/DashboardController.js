const SectorService = require("../../services/SectorService");
const SchoolService = require('../../services/SchoolService');
const GradeService = require('../../services/GradeService');

class DashboardController {
  // Render the dashboard page
  // GET /admin
  index = async (req, res) => {
    try {
      const gradesWithStudentsCount = await GradeService.getStudentsCountByGrade();
      const schoolsWithStudentsCount = await SchoolService.getStudentsCountBySchool();
      const sectorsWithEmployeesCount = await SectorService.getEmployeesCountBySector();

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
