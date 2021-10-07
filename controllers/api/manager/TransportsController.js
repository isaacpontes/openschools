const TransportService = require("../../../services/TransportService");

class TransportsController {
  findAll = async (req, res) => {
    try {
      const transports = await TransportService.findAll();
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
