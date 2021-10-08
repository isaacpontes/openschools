const TransportService = require("../../services/TransportService");

class TransportsController {
  // Render a list of all transports
  // GET /transports
  index = async (req, res) => {
    try {
      const transports = await TransportService.findAll();
      res.render('admin/transports/index', { transports });
    } catch (error) {
      res.render('pages/error', { error });
    }
  }

  // Save a new transport to the database
  // POST /transports
  save = async (req, res) => {
    const { name, driver, info } = req.body.transport;
    const transport = TransportService.create(name, driver, info);

    try {
      await TransportService.save(transport);
      req.flash('success', 'Transporte salvo com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao salvar transporte.');
      return res.redirect('/admin/transports/create');
    }
  }

  // Render the create transport form
  // GET /transports/create
  create = (req, res) => {
    try {
      const transport = TransportService.create();
      return res.render('admin/transports/create', { transport });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render transport edit form
  // GET /transports/:id/edit
  edit = async (req, res) => {
    const id = req.params.id;

    try {
      const transport = await TransportService.findById(id);
      return res.render('admin/transports/edit', { transport });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update a transport in the database
  // PUT /transports/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, driver, info } = req.body.transport;

    try {
      const transport = await TransportService.findById(id);

      if (name) {
        transport.name = name;
      }
      if (driver) {
        transport.driver = driver;
      }
      if (info) {
        transport.info = info;
      }

      await TransportService.save(transport);

      req.flash('success', 'Transporte atualizado com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar transporte.');
      return res.redirect(`/admin/transports/${id}/edit`);
    }
  }

  // Delete transport from database
  // DELETE /transports/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await TransportService.deleteOne(id);
      req.flash('success', 'Transporte excluído com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao excluir transporte.');
      return res.redirect('admin/transports/index');
    }
  }
}

module.exports = TransportsController;
