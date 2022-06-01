const userService = require('../../services/user-service');

module.exports = {
  // Return a list of all users
  // GET /api/admin/users
  index: async (req, res) => {
    try {
      const users = await userService.findAll();
      
      return res.json(users);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar usuários',
        error: error.message
      });
    }
  },

  // Save a new user to the database
  // POST /api/admin/users
  save: async (req, res) => {
    const { name, role, email, password } = req.body;
    const user = userService.create(name, role, email, password);

    try {
      await userService.save(user);
      
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar usuário',
        error: error.message
      });
    }
  },
  
  // Return a single user from the database
  // GET /api/admin/users/:id
  show: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await userService.findById(id);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar usuário',
        error: error.message
      });
    }
  },

  // Updates an user in the database
  // PUT /api/admin/users/:id
  update: async (req, res) => {
    const { id } = req.params;
    const { name, role, email, password, password_confirmation } = req.body;
  
    try {
      const user = await userService.findById(id);
  
      if (name) user.name = name;
      if (role) user.role = role;
      if (email) user.email = email;
      if (password) {
        if (!password_confirmation) {
          throw new Error('A confirmação da senha é obrigatória.');
        }
        if (password !== password_confirmation) {
          throw new Error('As senhas não conferem.');
        }
        user.password = password;
      }
  
      await userService.save(user);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar usuário',
        error: error.message
      });
    }
  },

  // Deletes an user in the database
  // DELETE /api/admin/users/:id
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await userService.deleteOne(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir usuário',
        error: error.message
      });
    }
  }
};
