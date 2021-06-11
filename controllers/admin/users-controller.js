const User = require('../../models/user');

module.exports = {
  index: async function (req, res) {
    try {
      const users = await User.find({});
      res.render('admin/users/index', { users });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar lista de usuários.' });
    }
  },

  save: async function (req, res) {
    const { name, role, email, password, passwordConfirmation } = req.body.user;
    const newUser = new User({ name, role, email, password });
  
    try {
      await newUser.validate();
      if (password !== passwordConfirmation) {
        newUser.errors = { ...newUser.errors, passwordConfirmation: 'As senhas não conferem.' };
        throw new Error('As senhas não conferem.');
      }
      await newUser.save();
      req.flash('success', 'Usuário salvo com sucesso.');
      res.redirect('/admin/users');
    } catch (error) {
      res.render('admin/users/new', { user: newUser, error: 'Erro ao salvar usuário.' });
    }
  },

  new: async function (req, res) {
    try {
      const user = new User();
      res.render('admin/users/new', { user });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  edit: async function (req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.render('admin/users/edit', { user: user });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  update: async function (req, res) {
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
      res.redirect('/admin/users');
    } catch (error) {
      res.render('admin/users/edit', { user: { name, role, email }, error: 'Erro ao salvar usuário.' });
    }
  },

  delete: async function (req, res) {
    try {
      await User.findByIdAndRemove(req.params.id);
      req.flash('success', 'Usuário excluído com sucesso.');
      res.redirect('/admin/users');
    } catch (error) {
      res.render('admin/users/index', { error: 'Erro ao excluir usuário.' });
    }
  },
};
