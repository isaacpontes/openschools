const Classroom = require('../models/classroom');
const School = require('../models/school');
const User = require('../models/user');

module.exports = {
  // Render a list of all schools
  // GET /schools
  index: async function (req, res) {
    try {
      const schools = await School.find({});
      res.status(200).render('schools/index', { schools });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Erro ao carregar lista de escolas.' });
    }
  },

  // Save a new school to the database
  // POST /schools
  save: async function (req, res) {
    const { name, inepCode, address, manager } = req.body.school;
    const school = new School({ name, inepCode, address, manager });

    try {
      await school.save();
      req.flash('success', 'Escola salva com sucesso.');
      res.status(201).redirect('/schools');
    } catch (error) {
      const allManagers = await User.find({ role: 'manager' });
      res.status(500).render('schools/new', { school, allManagers, error: 'Erro ao salvar escola.' });
    }
  },

  // Render the new school form
  // GET /schools/:id/new
  new: async function (req, res) {
    try {
      const school = new School();
      const allManagers = await User.find({ role: 'manager' });
      res.status(200).render('schools/new', { school, allManagers });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render a single school
  // GET /schools/:id
  show: async function (req, res) {
    try {
      const school = await School.findById(req.params.id).populate('manager');
      const classrooms = await Classroom.find({ school: school._id });
  
      res.status(200).render('schools/show', { school, classrooms });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render the edit school form
  // GET /schools/:id/edit
  edit: async function (req, res) {
    try {
      const school = await School.findById(req.params.id);
      const allManagers = await User.find({ role: 'manager' });

      res.status(200).render('schools/edit', { school, allManagers });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Updates a school in the database
  // PUT /schools/:id
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
      res.status(200).redirect('/schools');
    } catch (error) {
      const allManagers = await User.find({ role: 'manager' });
      res.status(500).render('schools/edit', {
        school: { name, inepCode, address, manager },
        allManagers,
        error: 'Erro ao salvar escola.'
      });
    }
  },

  // Delete a school from the database
  // DELETE /schools/:id
  delete: async function (req, res) {
    try {
      await School.findByIdAndRemove(req.params.id);
  
      req.flash('success', 'Escola excluída com sucesso.');
      res.status(204).redirect('/schools');
    } catch (error) {
      res.status(500).render('schools/index', { error: 'Erro ao excluir usuário.' });
    }
  },

  // Render the new classroom form
  // GET /schools/:id/addClassroom
  addClassroom: async function (req, res) {
    try {
      const classroom = new Classroom();
      classroom.school = req.params.id;

      res.render('classrooms/new', { classroom });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  }
};
