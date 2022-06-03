const AcademicYear = require('../database/models/AcademicYear');

module.exports = {
  create: (year) => {
    const academic_year = AcademicYear.build({ year });
    return academic_year;
  },

  findAll: async () => {
    const academic_years = await AcademicYear.findAll();
    return academic_years;
  },

  findById: async (id) => {
    const academic_year = await AcademicYear.findByPk(id);
    return academic_year;
  },

  save: async (academic_year) => {
    await academic_year.save();
    return academic_year;
  },

  updateOne: async (id, year) => {
    await AcademicYear.update({ year }, { where: { id } });
  },

  deleteOne: async (id) => {
    await AcademicYear.destroy({ where: { id } });
  }
};
