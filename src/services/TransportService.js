const Transport = require("../models/Transport");

class TransportService {
  static create(name, driver, info) {
    const transport = Transport.build({ name, driver, info });
    return transport;
  }

  static async findAll() {
    const transports = await Transport.findAll();
    return transports;
  }

  static async findById(id) {
    const transport = await Transport.findByPk(id);
    return transport;
  }

  static async save(transport) {
    await transport.save();
    return transport;
  }

  static async updateOne(id, name, driver, info) {
    await Transport.update({ name, driver, info }, { where: { id } });
  }

  static async deleteOne(id) {
    await Transport.destroy({ where: { id } });
  }
}

module.exports = TransportService;
