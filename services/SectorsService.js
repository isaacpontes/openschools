const Sector = require('../models/Sector');

class SectorsService {
  create = (name) => {
    const sector = new Sector();
    if (typeof name !== 'undefined') {
      sector.name = name;
    }
    return sector;
  }

  findAll = async () => {
    const sectors = await Sector.find({});
    return sectors;
  }

  findById = async (id) => {
    const sector = await Sector.findById(id);
    return sector;
  }

  save = async (sector) => {
    await sector.save();
    return sector;
  }

  updateOne = async (id, name) => {
    await Sector.findByIdAndUpdate(id, { name, updated: Date.now() });
  }

  deleteOne = async (id) => {
    await Sector.findByIdAndRemove(id);
  }
}

module.exports = SectorsService;
