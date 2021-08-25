const User = require('../../../models/user');
const schoolsService = require('../../../services/schools-service');

module.exports = {
  // Return a list of all schools
  // GET /api/admin/schools
  findAll: async function (req, res) {
    try {
      const schools = await schoolsService.findAll({ path: 'manager'});
      return res.json(schools);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escolas',
        error: error.message
      });
    }
  },

  // Return a single school
  // GET /api/admin/schools/:id
  findById: async function (req, res) {
    const { id } = req.params;
    try {
      const school = await schoolsService.findById(id, { path: 'manager' });
      return res.json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escola',
        error: error.message
      });
    }
  },

  // Save a new school to the database
  // POST /api/admin/schools
  save: async function (req, res) {
    const { name, inepCode, address, manager } = req.body;
    const school = schoolsService.create(name, inepCode, address, manager);

    try {
      await schoolsService.save(school);
      return res.status(201).json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao criar escola',
        error: error.message
      });
    }
  },

  // Updates a school in the database
  // PUT /api/admin/schools/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name, inepCode, address, manager } = req.body;

    try {
      const school = await schoolsService.findById(id);

      if (name) {
        school.name = name;
      }
      if (inepCode) {
        school.inepCode = inepCode;
      }
      if (address) {
        school.address = address;
      }
      if (manager) {
        school.manager = manager;
      }

      await schoolsService.save(school);

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
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await schoolsService.delete(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir escola',
        error: error.message
      });
    }
  }
};
