const TransportService = require("../../services/TransportService");

module.exports = {
  // Find all transports
  // GET /api/manager/transports
  index: async (req, res) => {
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
