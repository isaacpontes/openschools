const Transport = require('../models/transport');

module.exports = {
  create: function () {
    const transport = new Transport();
    return transport;
  },

  findAll: async function () {
    const transports = await Transport.find({});
    return transports;
  },

  findOne: async function (id) {
    const transport = await Transport.findById(id);
    return transport;
  },

  save: async function (name, driver, info) {
    const transport = new Transport({ name, driver, info });
    await transport.save();
    return transport;
  },

  updateOne: async function (id, name, driver, info) {
    await Transport.findByIdAndUpdate(id, { name, driver, info, updated: Date.now() });
  },

  deleteOne: async function (id) {
    await Transport.findByIdAndRemove(id);
  }
}
