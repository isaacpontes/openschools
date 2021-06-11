const transportsService = require('../../services/transports-service');

module.exports = {
  // Render a list of all transports
  // GET /transports
  index: async function (req, res) {
    try {
      const transports = await transportsService.findAll();
      res.render('admin/transports/index', { transports });
    } catch (error) {
      res.render('pages/error', { error });
    }
  },

  // Save a new transport to the database
  // POST /transports
  save: async function (req, res) {
    const { name, driver, info } = req.body.transport;
    try {
      await transportsService.save(name, driver, info);
      req.flash('success', 'Transporte salvo com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao salvar transporte.');
      return res.redirect('admin/transports/new');
    }
  },

  // Render the new transport form
  // GET /transports/new
  new: function (req, res) {
    try {
      const transport = transportsService.create();
      return res.render('admin/transports/new', { transport });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Render transport edit form
  // GET /transports/:id/edit
  edit: async function (req, res) {
    const id = req.params.id;
    try {
      const transport = await transportsService.findOne(id);
      return res.render('admin/transports/edit', { transport });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Update a transport in the database
  // PUT /transports/:id
  update: async function (req, res) {
    const id = req.params.id;
    const { name, driver, info } = req.body.transport;
    try {
      await transportsService.updateOne(id, name, driver, info);
      req.flash('success', 'Transporte atualizado com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar transporte.');
      return res.redirect('admin/transports/new');
    }
  },

  // Delete transport from database
  // DELETE /transports/:id
  delete: async function (req, res) {
    const id = req.params.id;
    try {
      await transportsService.deleteOne(id);
      req.flash('success', 'Transporte excluído com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao excluir transporte.');
      return res.redirect('admin/transports/index');
    }
  }
};
