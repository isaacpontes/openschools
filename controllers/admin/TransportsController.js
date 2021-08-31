class TransportsController {
  constructor (transportsService) {
    this.transportsService = transportsService;
  }

  // Render a list of all transports
  // GET /transports
  async index(req, res) {
    try {
      const transports = await this.transportsService.findAll();
      res.render('admin/transports/index', { transports });
    } catch (error) {
      res.render('pages/error', { error });
    }
  }

  // Save a new transport to the database
  // POST /transports
  async save(req, res) {
    const { name, driver, info } = req.body.transport;
    try {
      await this.transportsService.save(name, driver, info);
      req.flash('success', 'Transporte salvo com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao salvar transporte.');
      return res.redirect('admin/transports/new');
    }
  }

  // Render the new transport form
  // GET /transports/new
  create(req, res) {
    try {
      const transport = this.transportsService.create();
      return res.render('admin/transports/new', { transport });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render transport edit form
  // GET /transports/:id/edit
  async edit(req, res) {
    const id = req.params.id;
    try {
      const transport = await this.transportsService.findOne(id);
      return res.render('admin/transports/edit', { transport });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update a transport in the database
  // PUT /transports/:id
  async update(req, res) {
    const id = req.params.id;
    const { name, driver, info } = req.body.transport;
    try {
      await this.transportsService.updateOne(id, name, driver, info);
      req.flash('success', 'Transporte atualizado com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar transporte.');
      return res.redirect('admin/transports/new');
    }
  }

  // Delete transport from database
  // DELETE /transports/:id
  async delete(req, res) {
    const id = req.params.id;
    try {
      await this.transportsService.deleteOne(id);
      req.flash('success', 'Transporte excluído com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao excluir transporte.');
      return res.redirect('admin/transports/index');
    }
  }
}

module.exports = TransportsController;
