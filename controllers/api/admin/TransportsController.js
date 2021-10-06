class TransportsController {
  constructor (service) {
    this.service = service;
  }

  // Return a list of all transports
  // GET /api/admintransports
  findAll = async (req, res) => {
    try {
      const transports = await this.service.findAll();
      return res.json(transports);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar transportes',
        error: error.message
      });
    }
  }

  // Save a new transport to the database
  // POST /api/admin/transports
  save = async (req, res) => {
    const { name, driver, info } = req.body;
    const transport = this.service.create(name, driver, info);

    try {
      await this.service.save(transport);

      return res.status(201).json(transport);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar transporte',
        error: error.message
      });
    }
  }

  // Return a single transport
  // GET /api/admin/transports/:id
  findById = async (req, res) => {
    const { id } = req.params;

    try {
      const transport = await this.service.findById(id);

      return res.json(transport);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar transporte',
        error: error.message
      });
    }
  }

  // Update a transport in the database
  // PUT /api/admin/transports/:id
  update = async (req, res) => {
    const id = req.params.id;
    const { name, driver, info } = req.body;

    try {
      const transport = await this.service.findById(id);

      if (name) {
        transport.name = name;
      }
      if (driver) {
        transport.driver = driver;
      }
      if (info) {
        transport.info = info;
      }

      await this.service.save(transport);

      return res.json(transport);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar transporte',
        error: error.message
      });
    }
  }

  // Delete transport from database
  // DELETE /api/admin/transports/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await this.service.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir transporte',
        error: error.message
      });
    }
  }
}

module.exports = TransportsController;
