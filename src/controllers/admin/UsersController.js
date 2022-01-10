const UserService = require("../../services/UserService");

class UsersController {
  // Render a list of all users
  // GET /admin/users
  index = async (req, res) => {
    try {
      const users = await UserService.findAll();
      return res.render('admin/users/index', { users });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new user to the database
  // POST /admin/users
  save = async (req, res) => {
    const { name, role, email, password, password_confirmation } = req.body.user;
    const newUser = UserService.create(name, role, email, password);

    try {
      await newUser.validate();

      if (password !== password_confirmation) {
        newUser.errors = { ...newUser.errors, password_confirmation: 'As senhas não conferem.' };
        throw new Error('As senhas não conferem.');
      }

      await UserService.save(newUser);

      req.flash('success', 'Usuário salvo com sucesso.');
      return res.redirect('/admin/users');
    } catch (error) {
      req.flash('error', 'Erro ao salvar usuário');
      return res.redirect('/admin/users/create');
    }
  }

  // Render the create user form
  // GET /admin/users/create
  create = async (req, res) => {
    try {
      const user = UserService.create();

      return res.render('admin/users/create', { user });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render the edit user form
  // GET /admin/users/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await UserService.findById(id);

      return res.render('admin/users/edit', { user });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update the user in the database
  // PUT /admin/users/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, role, email, password, password_confirmation } = req.body.user;
  
    try {
      const user = await UserService.findById(id);
  
      if (name) user.name = name;
      if (role) user.role = role;
      if (email) user.email = email;
      if (password) {
        if (!password_confirmation) {
          throw new Error('A confirmação da senha é obrigatória.')
        }
        if (password !== password_confirmation) {
          throw new Error('As senhas não conferem.');
        }
        user.password = password;
      }
  
      await UserService.save(user);

      req.flash('success', 'Usuário atualizado com sucesso.');
      return res.redirect('/admin/users');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar usuário');
      return res.redirect(`/admin/users/${id}/edit`);
    }
  }

  // Delete the user in the database
  // DELETE /admin/users/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await UserService.deleteOne(id);

      req.flash('success', 'Usuário excluído com sucesso.');
      return res.redirect('/admin/users');
    } catch (error) {
      req.flash('error', 'Erro ao excluir usuário');
      return res.redirect('/admin/users');
    }
  }
}

module.exports = UsersController;
