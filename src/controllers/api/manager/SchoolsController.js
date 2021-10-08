const SchoolService = require("../../../services/SchoolService");

class SchoolsController {
  // Return a list of all schools belonging to current user
  // GET /api/manager/schools
  findManagerSchools = async (req, res) => {
    const manager = req.user.id;

    try {
      const schools = await SchoolService.findByManager(manager);
      return res.status(200).json(schools);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao recuperar lista de escolas.',
        error: error.message
      });
    }
  }

  // Return a single school with it's classrooms
  // GET /api/manager/schools/:id
  findSchoolById = async (req, res) => {
    const { id } = req.params;

    try {
      const school = await SchoolService.findById(id);
      return res.status(200).json(school);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar escola.' });
    }
  }
}

module.exports = SchoolsController;
