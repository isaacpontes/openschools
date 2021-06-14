const User = require('../../models/user');
const classroomsService = require('../../services/classrooms-service');
const schoolsService = require('../../services/schools-service');

module.exports = {
  // Render a list of all schools
  // GET /admin/schools
  index: async function (req, res) {
    try {
      const schools = await schoolsService.findAll({ path: 'manager'});
      return res.status(200).render('admin/schools/index', { schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Save a new school to the database
  // POST /admin/schools
  save: async function (req, res) {
    const { name, inepCode, address, manager } = req.body.school;

    try {
      await schoolsService.save(name, inepCode, address, manager);
      req.flash('success', 'Escola salva com sucesso.');
      return res.status(201).redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao salvar escola.');
      return res.status(400).redirect('admin/schools/new');
    }
  },

  // Render the new school form
  // GET /admin/schools/new
  new: async function (req, res) {
    try {
      const school = schoolsService.create();
      const allManagers = await User.find({ role: 'manager' });
      return res.render('admin/schools/new', { school, allManagers });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Render a single school
  // GET /admin/schools/:id
  show: async function (req, res) {
    const { id } = req.params;
    try {
      const school = await schoolsService.findById(id, { path: 'manager' });
      const classrooms = await classroomsService.findBySchoolId(id, { path: 'grade' });
      return res.render('admin/schools/show', { school, classrooms });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Render the edit school form
  // GET /admin/schools/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    try {
      const school = await schoolsService.findById(id);
      const allManagers = await User.find({ role: 'manager' });
      return res.render('admin/schools/edit', { school, allManagers });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Updates a school in the database
  // PUT /admin/schools/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name, inepCode, address, manager } = req.body.school;
    try {
      await schoolsService.update(id, name, inepCode, address, manager);
      req.flash('success', 'Escola atualizada com sucesso.');
      return res.status(200).redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar escola.');
      return res.status(500).render('admin/schools/edit');
    }
  },

  // Delete a school from the database
  // DELETE /admin/schools/:id
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      await schoolsService.delete(id);
      req.flash('success', 'Escola excluída com sucesso.');
      return res.status(204).redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao excluir escola.');
      return res.status(400).redirect('admin/schools/index');
    }
  }
};
