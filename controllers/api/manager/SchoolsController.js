class SchoolsController {
  constructor (service) {
    this.service = service;
  }

  // Return a list of all schools belonging to current user
  // GET /api/manager/schools
  findManagerSchools = async (req, res) => {
    const manager = req.user._id;

    try {
      const schools = await this.service.findByManager(manager);
      return res.status(200).json(schools);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar lista de escolas.' });
    }
  }

  // Return a single school with it's classrooms
  // GET /api/manager/schools/:id
  findSchoolById = async (req, res) => {
    const { id } = req.params;

    try {
      const school = await this.service.findById(id);
      return res.status(200).json(school);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar escola.' });
    }
  }
}

module.exports = SchoolsController;
