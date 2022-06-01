const Transport = require('../database/models/Transport');

module.exports = {
  create: (name, driver, info) => {
    const transport = Transport.build({ name, driver, info });
    return transport;
  },

  findAll: async () => {
    const transports = await Transport.findAll();
    return transports;
  },

  findById: async (id) => {
    const transport = await Transport.findByPk(id);
    return transport;
  },

  save: async (transport) => {
    await transport.save();
    return transport;
  },

  updateOne: async (id, name, driver, info) => {
    await Transport.update({ name, driver, info }, { where: { id } });
  },

  deleteOne: async (id) => {
    await Transport.destroy({ where: { id } });
  }
};
