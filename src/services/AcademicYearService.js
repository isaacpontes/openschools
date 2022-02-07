const AcademicYear = require('../models/AcademicYear');

class AcademicYearService {
  static create(year) {
    const academicYear = AcademicYear.build({ year });
    return academicYear;
  }

  static async findAll() {
    const academicYears = await AcademicYear.findAll();
    return academicYears;
  }

  static async findById(id) {
    const academicYear = await AcademicYear.findByPk(id);
    return academicYear;
  }

  static async save(academicYear) {
    await academicYear.save();
    return academicYear;
  }

  static async updateOne(id, year) {
    await AcademicYear.update({ year }, { where: { id } });
  }

  static async deleteOne(id) {
    await AcademicYear.destroy({ where: { id } });
  }
}

module.exports = AcademicYearService;
