const Transport = require("../models/Transport");

class TransportsService {
  create(name, driver, info) {
    const transport = Transport.build({ name, driver, info });
    return transport;
  }

  async findAll() {
    const transports = await Transport.findAll();
    return transports;
  }

  async findById(id) {
    const transport = await Transport.findByPk(id);
    return transport;
  }

  async save(transport) {
    await transport.save();
    return transport;
  }

  async updateOne(id, name, driver, info) {
    await Transport.update({ name, driver, info }, { where: { id } });
  }

  async deleteOne(id) {
    await Transport.destroy({ where: { id } });
  }
}

module.exports = TransportsService;
