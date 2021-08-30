const sectorsService = require('../../../services/sectors-service');

module.exports = {
  // Return a list of all sectors
  // GET /api/admin/sectors
  findAll: async function (req, res) {
    try {
      const sectors = await sectorsService.findAll();
      return res.json(sectors);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar setores',
        error: error.message
      });
    }
  },

  // Return a list of all sectors
  // GET /api/admin/sectors/:id
  findById: async function (req, res) {
    const { id } = req.params;
    
    try {
      const sector = await sectorsService.findById(id);
      return res.json(sector);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar setor',
        error: error.message
      });
    }
  },

  // Save a new sector to the database
  // POST /api/admin/sectors
  save: async function (req, res) {
    const { name } = req.body;
    const sector = sectorsService.create(name);

    try {
      await sectorsService.save(sector);
      return res.status(201).json(sector);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar setor',
        error: error.message
      });
    }
  },

  // Update a sector in the database
  // PUT /api/admin/sectors/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const sector = await sectorsService.findById(id);

      if (name) {
        sector.name = name;
        sector.updated = Date.now();
      }

      await sectorsService.save(sector);

      return res.json(sector);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar setor',
        error: error.message
      });
    }
  },

  // Delete a sector from the database
  // DELETE /api/admin/sectors/:id
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await sectorsService.deleteOne(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir setor',
        error: error.message
      });
    }
  },
};
