const Sector = require('../models/sector');

module.exports = {
  create: function () {
    const sector = new Sector();
    return sector;
  },

  findAll: async function () {
    const sectors = await Sector.find({});
    return sectors;
  },

  findOne: async function (id) {
    const sector = await Sector.findById(id);
    return sector;
  },

  save: async function (name) {
    const sector = new Sector({ name });
    await sector.save();
    return sector;
  },

  updateOne: async function (id, name) {
    await Sector.findByIdAndUpdate(id, { name, updated: Date.now() });
  },

  deleteOne: async function (id) {
    await Sector.findByIdAndRemove(id);
  }
}
