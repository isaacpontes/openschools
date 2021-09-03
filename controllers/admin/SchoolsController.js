const Controller = require('../Controller');
const usersService = require('../../services/users-service');

class SchoolsController extends Controller {
  // Render a list of all schools
  // GET /admin/schools
  index = async (req, res) => {
    try {
      const schools = await this.service.findAll({ path: 'manager'});
      return res.status(200).render('admin/schools/index', { schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Save a new school to the database
  // POST /admin/schools
  save = async (req, res) => {
    const { name, inepCode, address, manager } = req.body.school;
    const school = this.service.create(name, inepCode, address, manager);

    try {
      await this.service.save(school);
      req.flash('success', 'Escola salva com sucesso.');
      return res.redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao salvar escola.');
      return res.redirect('/admin/schools/create');
    }
  }

  // Render the create school form
  // GET /admin/schools/create
  create = async (req, res) => {
    try {
      const school = this.service.create();
      const allManagers = await usersService.findAllManagers();
      return res.render('admin/schools/create', { school, allManagers });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render a single school
  // GET /admin/schools/:id
  show = async (req, res) => {
    const { id } = req.params;
    try {
      const school = await this.service.findById(id, { path: 'manager' });
      return res.render('admin/schools/show', { school });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render the edit school form
  // GET /admin/schools/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;
    try {
      const school = await this.service.findById(id);
      const allManagers = await usersService.findAllManagers();
      return res.render('admin/schools/edit', { school, allManagers });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Updates a school in the database
  // PUT /admin/schools/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, inepCode, address, manager } = req.body.school;
    try {
      await this.service.update(id, name, inepCode, address, manager);
      req.flash('success', 'Escola atualizada com sucesso.');
      return res.redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar escola.');
      return res.redirect(`/admin/schools/${id}/edit`);
    }
  }

  // Delete a school from the database
  // DELETE /admin/schools/:id
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await this.service.delete(id);
      req.flash('success', 'Escola excluída com sucesso.');
      return res.redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao excluir escola.');
      return res.redirect('/admin/schools');
    }
  }
}

module.exports = SchoolsController;
