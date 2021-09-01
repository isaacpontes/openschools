class UsersController {
  constructor (service) {
    this.service = service;
  }

  // Render a list of all users
  // GET /admin/users
  index = async (req, res) => {
    try {
      const users = await this.service.findAll();
      return res.render('admin/users/index', { users });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new user to the database
  // POST /admin/users
  save = async (req, res) => {
    const { name, role, email, password, passwordConfirmation } = req.body.user;
    const newUser = this.service.create(name, role, email, password);

    try {
      await newUser.validate();

      if (password !== passwordConfirmation) {
        newUser.errors = { ...newUser.errors, passwordConfirmation: 'As senhas não conferem.' };
        throw new Error('As senhas não conferem.');
      }

      await this.service.save(newUser);

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
      const user = this.service.create();

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
      const user = await this.service.findById(id);

      return res.render('admin/users/edit', { user });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update the user in the database
  // PUT /admin/users/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, role, email, password, passwordConfirmation } = req.body.user;
  
    try {
      const user = await this.service.findById(id);
  
      if (name != '') user.name = name;
      if (role != '') user.role = role;
      if (email != '') user.email = email;
      if (password != '') {
        if (password !== passwordConfirmation) {
          throw new Error('As senhas não conferem.');
        }
        user.password = password;
      }
  
      await this.service.save(user);

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
      await this.service.delete(id);

      req.flash('success', 'Usuário excluído com sucesso.');
      return res.redirect('/admin/users');
    } catch (error) {
      req.flash('error', 'Erro ao excluir usuário');
      return res.redirect('/admin/users');
    }
  }
}

module.exports = UsersController;
