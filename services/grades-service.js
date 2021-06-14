const Grade = require('../models/grade');

module.exports = {
  create: function (name) {
    const grade = new Grade();
    if (typeof name !== 'undefined') {
      grade.name = name;
    }
    return grade;
  },

  findAll: async function () {
    const grades = await Grade.find({});
    return grades;
  },

  findOne: async function (id) {
    const grade = await Grade.findById(id);
    return grade;
  },

  save: async function (grade) {
    await grade.save();
    return grade;
  },

  updateOne: async function (id, name) {
    await Grade.findByIdAndUpdate(id, { name, updated: Date.now() });
  },

  deleteOne: async function (id) {
    await Grade.findByIdAndRemove(id);
  }
}
