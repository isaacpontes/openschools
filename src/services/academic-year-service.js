const AcademicYear = require('../database/models/AcademicYear');

module.exports = {
  create: (year) => {
    const academicYear = AcademicYear.build({ year });
    return academicYear;
  },

  findAll: async () => {
    const academicYears = await AcademicYear.findAll();
    return academicYears;
  },

  findById: async (id) => {
    const academicYear = await AcademicYear.findByPk(id);
    return academicYear;
  },

  save: async (academicYear) => {
    await academicYear.save();
    return academicYear;
  },

  updateOne: async (id, year) => {
    await AcademicYear.update({ year }, { where: { id } });
  },

  deleteOne: async (id) => {
    await AcademicYear.destroy({ where: { id } });
  }
}
