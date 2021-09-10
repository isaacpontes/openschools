const Controller = require("../Controller");

class TransportsController extends Controller {
  // Render a list of all transports
  // GET /transports
  index = async (req, res) => {
    try {
      const transports = await this.service.findAll();
      res.render('admin/transports/index', { transports });
    } catch (error) {
      res.render('pages/error', { error });
    }
  }

  // Save a new transport to the database
  // POST /transports
  save = async (req, res) => {
    const { name, driver, info } = req.body.transport;
    const transport = this.service.create(name, driver, info);

    try {
      await this.service.save(transport);
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
      const transport = this.service.create();
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
      const transport = await this.service.findOne(id);
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
      await this.service.updateOne(id, name, driver, info);
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
      await this.service.deleteOne(id);
      req.flash('success', 'Transporte excluído com sucesso.');
      return res.redirect('/admin/transports');
    } catch (error) {
      req.flash('error', 'Erro ao excluir transporte.');
      return res.redirect('admin/transports/index');
    }
  }
}

module.exports = TransportsController;
