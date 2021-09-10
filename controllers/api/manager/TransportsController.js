class TransportsController {
  constructor (service) {
    this.service = service;
  }

  findAll = async (req, res) => {
    try {
      const transports = await this.service.findAll();
      return res.json(transports);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao recuperar transportes.',
        error: error.message
      });
    }
  }
}

module.exports = TransportsController;
