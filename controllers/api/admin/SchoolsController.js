class SchoolsController {
  constructor (service) {
    this.service = service;
  }

  // Return a list of all schools
  // GET /api/admin/schools
  findAll = async (req, res) => {
    try {
      const schools = await this.service.findAll({ path: 'manager'});
      return res.json(schools);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escolas',
        error: error.message
      });
    }
  }

  // Return a single school
  // GET /api/admin/schools/:id
  findById = async (req, res) => {
    const { id } = req.params;
    try {
      const school = await this.service.findById(id, { path: 'manager' });
      return res.json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escola',
        error: error.message
      });
    }
  }

  // Save a new school to the database
  // POST /api/admin/schools
  save = async (req, res) => {
    const { name, inepCode, address, manager } = req.body;
    const school = this.service.create(name, inepCode, address, manager);

    try {
      await this.service.save(school);
      return res.status(201).json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao criar escola',
        error: error.message
      });
    }
  }

  // Updates a school in the database
  // PUT /api/admin/schools/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, inepCode, address, manager } = req.body;

    try {
      const school = await this.service.findById(id);

      if (name) {
        school.name = name;
      }
      if (inepCode) {
        school.inepCode = inepCode;
      }
      if (address) {
        school.address = address;
      }
      if (manager) {
        school.manager = manager;
      }

      await this.service.save(school);

      return res.status(200).json(school);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar escola',
        error: error.message
      });
    }
  }

  // Delete a school from the database
  // DELETE /api/admin/schools/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await this.service.delete(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir escola',
        error: error.message
      });
    }
  }
}

module.exports = SchoolsController;
