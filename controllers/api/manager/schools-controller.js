const schoolsService = require('../../../services/schools-service');

module.exports = {
  // Return a list of all schools belonging to current user
  // GET /api/manager/schools
  findManagerSchools: async function (req, res) {
    const manager = req.user._id;

    try {
      const schools = await schoolsService.findByManager(manager);
      return res.status(200).json(schools);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar lista de escolas.' });
    }
  },

  // Return a single school with it's classrooms
  // GET /api/manager/schools/:id
  findSchoolById: async function (req, res) {
    const { id } = req.params;

    try {
      const school = await schoolsService.findById(id);
      return res.status(200).json(school);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar escola.' });
    }
  }
};
