const Sector = require('../../models/sector');

module.exports = {
  // Render a list of all sectors
  // GET /sectors
  index: async function (req, res) {
    try {
      const sectors = await Sector.find({});
      return res.render('admin/sectors/index', { sectors });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar lista de setores.' });
    }
  },

  // Save a new sector to the database
  // POST /sectors
  save: async function (req, res) {
    const { name } = req.body.sector;
    const sector = new Sector({ name });
  
    try {
      await sector.save();
      req.flash('success', 'Setor salvo com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      return res.render('admin/sectors/new', { sector, error: 'Erro ao salvar setor.' });
    }
  },

  // Render the new sector form
  // GET /sectors/new
  new: async function (req, res) {
    try {
      const sector = new Sector();
      return res.render('admin/sectors/new', { sector });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render sector edit form
  // GET /sectors/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
  
    try {
      const sector = await Sector.findById(id);
      return res.render('admin/sectors/edit', { sector });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a sector in the database
  // PUT /sectors/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name } = req.body.sector;
  
    try {
      await Sector.findByIdAndUpdate(id, { name, updated: Date.now() });
  
      req.flash('success', 'Setor atualizado com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      return res.render('admin/sectors/edit', { sector: { name }, error: 'Erro ao salvar setor.' });
    }
  },

  // Delete sector from database
  // DELETE /sectors/:id
  delete: async function (req, res) {
    const { id } = req.params;
  
    try {
      await Sector.findByIdAndRemove(id);
  
      req.flash('success', 'Setor excluído com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      return res.redirect('/admin/sectors', { error: 'Erro ao excluir sectore.' });
    }
  }
};
