class UsersController {
  constructor (service) {
    this.service = service
  }

  // Return a list of all users
  // GET /api/admin/users
  findAll = async (req, res) => {
    try {
      const users = await this.service.findAll();
      
      return res.json(users);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar usuários',
        error: error.message
      });
    }
  }
  
  // Return a single user from the database
  // GET /api/admin/users/:id
  findById = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await this.service.findById(id);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar usuário',
        error: error.message
      });
    }
  }

  // Save a new user to the database
  // POST /api/admin/users
  save = async (req, res) => {
    const { name, role, email, password } = req.body;
    const user = this.service.create(name, role, email, password);

    try {
      await this.service.save(user)
      
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar usuário',
        error: error.message
      });
    }
  }

  // Updates an user in the database
  // PUT /api/admin/users/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, role, email, password } = req.body;
  
    try {
      const user = await this.service.findById(id);
  
      if (name) user.name = name;
      if (role) user.role = role;
      if (email) user.email = email;
      if (name || role || email) user.updated = Date.now();
  
      await user.save();
      
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar usuário',
        error: error.message
      });
    }
  }

  // Deletes an user in the database
  // DELETE /api/admin/users/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await this.service.delete(id);
      
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir usuário',
        error: error.message
      });
    }
  }
}

module.exports = UsersController;
