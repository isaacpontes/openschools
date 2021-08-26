const Transport = require('../models/transport');

module.exports = {
  create: function (name, driver, info) {
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
  },

  findAll: async function () {
    const transports = await Transport.find({});
    return transports;
  },

  findOne: async function (id) {
    const transport = await Transport.findById(id);
    return transport;
  },

  save: async function (transport) {
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
