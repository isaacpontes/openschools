const express = require('express');
const { ensureAdmin } = require('../config/auth');
const User = require('../models/user');
const router = express.Router();


// Render users index
router.get('/', ensureAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index', { users });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar lista de usuários.' });
  }
});


// Save new user
router.post('/', ensureAdmin, async (req, res) => {
  const { name, role, email, password, passwordConfirmation } = req.body.user;
  const newUser = new User({ name, role, email, password });

  try {
    await newUser.validate();
    if (password !== passwordConfirmation) {
      newUser.errors = { ...newUser.errors, passwordConfirmation: 'As senhas não conferem.' }
      throw new Error('As senhas não conferem.');
    }
    await newUser.save();
    req.flash('success', 'Usuário salvo com sucesso.');
    res.redirect('/users');
  } catch (error) {
    res.render('users/new', { user: newUser, error: 'Erro ao salvar usuário.' });
  }
});


// Render new user page
router.get('/new', ensureAdmin, (req, res) => {
  try {
    const user = new User();
    res.render('users/new', { user });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render single user page
router.get('/:id', ensureAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('tasks');
    res.render('users/show', { user: user });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render edit user page
router.get('/:id/edit', ensureAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user: user });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Update user
router.put('/:id', ensureAdmin, async (req, res) => {
  const { name, role, email, password, passwordConfirmation } = req.body.user;

  try {
    const user = await User.findById(req.params.id);

    if (name != '') user.name = name;
    if (role != '') user.role = role;
    if (email != '') user.email = email;
    if (password != '') {
      if (password !== passwordConfirmation) {
        throw new Error('As senhas não conferem.');
      }
      user.password = password;
    }

    await user.save();
    req.flash('success', 'Usuário atualizado com sucesso.');
    res.redirect('/users');
  } catch (error) {
    res.render('users/edit', { user: user, error: 'Erro ao salvar usuário.' });
  }
});


// Delete user
router.delete('/:id', ensureAdmin, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    req.flash('success', 'Usuário excluído com sucesso.');
    res.redirect('/users');
  } catch (error) {
    res.render('users/index', { user: newUser, error: 'Erro ao excluir usuário.' });
  }
});


module.exports = router;