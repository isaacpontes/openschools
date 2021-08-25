const sectorsService = require('../../services/sectors-service');

module.exports = {
  // Render a list of all sectors
  // GET /sectors
  index: async function (req, res) {
    try {
      const sectors = await sectorsService.findAll();
      return res.render('admin/sectors/index', { sectors });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Save a new sector to the database
  // POST /sectors
  save: async function (req, res) {
    const { name } = req.body.sector;
    const sector = sectorsService.create(name);

    try {
      await sectorsService.save(sector);
      req.flash('success', 'Setor salvo com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      req.flash('error', 'Erro ao salvar setor.');
      return res.redirect('/admin/sectors/new');
    }
  },

  // Render the new sector form
  // GET /sectors/new
  new: async function (req, res) {
    const sector = sectorsService.create();
    return res.render('admin/sectors/new', { sector });
  },

  // Render sector edit form
  // GET /sectors/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    try {
      const sector = await sectorsService.findById(id);
      return res.render('admin/sectors/edit', { sector });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Update a sector in the database
  // PUT /sectors/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name } = req.body.sector;
    try {
      await sectorsService.updateOne(id, name);
      req.flash('success', 'Setor atualizado com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar setor.');
      return res.redirect(`/admin/sectors/${id}/edit`);
    }
  },

  // Delete sector from database
  // DELETE /sectors/:id
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      await sectorsService.deleteOne(id);
      req.flash('success', 'Setor excluído com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      return res.redirect('/admin/sectors', { error: 'Erro ao excluir sectore.' });
    }
  },
};
