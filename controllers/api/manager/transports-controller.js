const Transport = require('../../../models/transport');
const transportsService = require('../../../services/transports-service');

module.exports = {
  findAll: async function (req, res) {
    try {
      const transports = await transportsService.findAll();
      return res.json(transports);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar transportes.' });
    }
  }
}
