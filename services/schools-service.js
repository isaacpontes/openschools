const School = require('../models/school');

module.exports = {
  create: function () {
    const school = new School();
    return school;
  },

  findAll: async function (populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const schools = await School.find({});
      return schools;
    }
    const schools = await School.find({}).populate(populateOptions);
    return schools;
  },

  findById: async function (id, populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const school = await School.findById(id);
      return school;
    }
    const school = await School.findById(id).populate(populateOptions);
    return school;
  },

  save: async function (name, inepCode, address, manager) {
    const school = new School({ name, inepCode, address, manager });
    await school.save();
    return school;
  },

  update: async function (id, name, inepCode, address, manager) {
    await School.findByIdAndUpdate(id, { name, inepCode, address, manager, updated: Date.now() });
  },

  delete: async function (id) {
    await School.findByIdAndRemove(id);
  }
}
