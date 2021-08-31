const Transport = require("../models/Transport");

class TransportsService {
  create(name, driver, info) {
    const transport = new Transport();

    if (typeof name !== 'undefined') {
      transport.name = name;
    }
    if (typeof driver !== 'undefined') {
      transport.driver = driver;
    }
    if (typeof info !== 'undefined') {
      transport.info = info;
    }

    return transport;
  }

  async findAll() {
    const transports = await Transport.find({});
    return transports;
  }

  async findOne(id) {
    const transport = await Transport.findById(id);
    return transport;
  }

  async save(transport) {
    await transport.save();
    return transport;
  }

  async updateOne(id, name, driver, info) {
    await Transport.findByIdAndUpdate(id, { name, driver, info, updated: Date.now() });
  }

  async deleteOne(id) {
    await Transport.findByIdAndRemove(id);
  }
}

module.exports = TransportsService;
