const schoolService = require('../../services/school-service');

module.exports = {
  // Return a list of all schools
  // GET /api/admin/schools
  index: async (req, res) => {
    try {
      const schools = await schoolService.findAll();
      return res.json(schools);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Erro ao retornar escolas',
        error: error.message
      });
    }
  },

  // Save a new school to the database
  // POST /api/admin/schools
  save: async (req, res) => {
    const { name, inep_code, address, user_id } = req.body;
    const school = schoolService.create(name, inep_code, address, user_id);

    try {
      await schoolService.save(school);
      return res.status(201).json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao criar escola',
        error: error.message
      });
    }
  },

  // Return a single school
  // GET /api/admin/schools/:id
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const school = await schoolService.findById(id);
      return res.json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escola',
        error: error.message
      });
    }
  },

  // Updates a school in the database
  // PUT /api/admin/schools/:id
  update: async (req, res) => {
    const { id } = req.params;
    const { name, inep_code, address, user_id } = req.body;

    try {
      const school = await schoolService.findById(id);

      if (name) {
        school.name = name;
      }
      if (inep_code) {
        school.inep_code = inep_code;
      }
      if (address) {
        school.address = address;
      }
      if (user_id) {
        school.user_id = user_id;
      }

      await schoolService.save(school);

      return res.status(200).json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar escola',
        error: error.message
      });
    }
  },

  // Delete a school from the database
  // DELETE /api/admin/schools/:id
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await schoolService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir escola',
        error: error.message
      });
    }
  }
};
