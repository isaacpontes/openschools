const Transport = require('../../../models/transport');

module.exports = {
  findAll: async function (req, res) {
    try {
      const transports = await Transport.find({});
      return res.json(transports);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao recuperar transportes.',
        error
      });
    }
  }
}
