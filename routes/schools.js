const express = require('express');
const School = require('../models/school');
const User = require('../models/user');
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

const router = express.Router();

function isManager(user, school) {
  return JSON.stringify(user._id) === JSON.stringify(school.manager._id) ? true : false;
}


// Render a list of all schools
// GET /schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find({});
    res.render('schools/index', { schools });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar lista de escolas.' });
  }
});


// Save a new school to the database
// POST /schools
router.post('/', async (req, res) => {
  const { name, inepCode, address, manager } = req.body.school;
  const school = new School({ name, inepCode, address, manager });
  try {
    await school.save();
    req.flash('success', 'Escola salva com sucesso.');
    res.redirect('/schools');
  } catch (error) {
    const allManagers = await User.find({ role: 'manager' });
    res.render('schools/new', { school, allManagers, error: 'Erro ao salvar escola.' });
  }
});

router.get('/new', async (req, res) => {
  try {
    const school = new School();
    const allManagers = await User.find({ role: 'manager' });
    res.render('schools/new', { school, allManagers });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render a single school
// GET /schools/:id
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate('manager');
    res.render('schools/show', { school: school });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render school edit form
// GET /schools/:id/edit
router.get('/:id/edit', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    const allManagers = await User.find({ role: 'manager' });
    res.render('schools/edit', { school, allManagers });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
})


router.put('/:id', async (req, res) => {
  const { name, inepCode, address, manager } = req.body.school;
  try {
    await School.findByIdAndUpdate(req.params.id, {
      name: name,
      inepCode: inepCode,
      address: address,
      manager: manager
    });

    req.flash('success', 'Escola atualizada com sucesso.');
    res.redirect('/schools');
  } catch (error) {
    const allManagers = await User.find({ role: 'manager' });
    res.render('schools/edit', { school, allManagers, error: 'Erro ao salvar escola.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await School.findByIdAndRemove(req.params.id);

    req.flash('success', 'Escola excluída com sucesso.');
    res.redirect('/schools');
  } catch (error) {
    res.render('schools/index', { error: 'Erro ao excluir usuário.' });
  }
});

module.exports = router;