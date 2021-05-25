const Classroom = require('../../models/classroom');
const School = require('../../models/school');
const User = require('../../models/user');

module.exports = {
  // Render a list of all schools
  // GET /admin/schools
  index: async function (req, res) {
    try {
      const schools = await School.find({}).populate('manager');
      return res.status(200).render('admin/schools/index', { schools });
    } catch (error) {
      return res.status(500).render('pages/error', { error: 'Erro ao carregar lista de escolas.' });
    }
  },

  // Save a new school to the database
  // POST /admin/schools
  save: async function (req, res) {
    const { name, inepCode, address, manager } = req.body.school;
    const school = new School({ name, inepCode, address, manager });

    try {
      await school.save();
      req.flash('success', 'Escola salva com sucesso.');
      return res.status(201).redirect('/admin/schools');
    } catch (error) {
      const allManagers = await User.find({ role: 'manager' });
      return res.status(500).render('admin/schools/new', { school, allManagers, error: 'Erro ao salvar escola.' });
    }
  },

  // Render the new school form
  // GET /admin/schools/new
  new: async function (req, res) {
    const school = new School();
    try {
      const allManagers = await User.find({ role: 'manager' });
      return res.status(200).render('admin/schools/new', { school, allManagers });
    } catch (error) {
      return res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render a single school
  // GET /admin/schools/:id
  show: async function (req, res) {
    try {
      const school = await School.findById(req.params.id).populate('manager');
      const classrooms = await Classroom.find({ school: school._id });
  
      return res.status(200).render('admin/schools/show', { school, classrooms });
    } catch (error) {
      return res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render the edit school form
  // GET /admin/schools/:id/edit
  edit: async function (req, res) {
    try {
      const school = await School.findById(req.params.id);
      const allManagers = await User.find({ role: 'manager' });

      return res.status(200).render('admin/schools/edit', { school, allManagers });
    } catch (error) {
      return res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Updates a school in the database
  // PUT /admin/schools/:id
  update: async function (req, res) {
    const { name, inepCode, address, manager } = req.body.school;
    try {
      await School.findByIdAndUpdate(req.params.id, {
        name: name,
        inepCode: inepCode,
        address: address,
        manager: manager
      });
  
      req.flash('success', 'Escola atualizada com sucesso.');
      return res.status(200).redirect('/admin/schools');
    } catch (error) {
      const allManagers = await User.find({ role: 'manager' });

      return res.status(500).render('admin/schools/edit', {
        school: { name, inepCode, address, manager },
        allManagers,
        error: 'Erro ao salvar escola.'
      });
    }
  },

  // Delete a school from the database
  // DELETE /admin/schools/:id
  delete: async function (req, res) {
    try {
      await School.findByIdAndRemove(req.params.id);
  
      req.flash('success', 'Escola excluída com sucesso.');
      return res.status(204).redirect('/admin/schools');
    } catch (error) {
      return res.status(500).render('admin/schools/index', { error: 'Erro ao excluir usuário.' });
    }
  }
};
