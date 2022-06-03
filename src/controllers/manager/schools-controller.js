const schoolService = require('../../services/school-service');

module.exports = {
  // Return a list of all schools belonging to current user
  // GET /api/manager/schools
  async index(req, res) {
    const managerId = req.user.id;

    try {
      const schools = await schoolService.findByManagerId(managerId);
      return res.status(200).json(schools);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao recuperar lista de escolas.',
        error: error.message
      });
    }
  },

  // Return a single school with it's classrooms
  // GET /api/manager/schools/:id
  async show(req, res) {
    const { id } = req.params;

    try {
      const school = await schoolService.findByIdWithClassrooms(id);
      return res.status(200).json(school);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar escola.' });
    }
  },

  // Adds a new classroom to a school
  // POST /api/manager/schools/:id/classrooms
  async addClassroom(req, res) {
    try {
      const school_id = req.params.id;
      const { name, grade_id } = req.body;
      await schoolService.addClassroom(name, grade_id, school_id);
      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar turma',
        error: error.message
      });
    }
  }
};
