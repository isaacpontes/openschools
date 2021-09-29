const AcademicYear = require("../models/AcademicYear");

class AcademicYearsService {
  create(year) {
    const academicYear = AcademicYear.build({ year });
    return academicYear;
  }

  async findAll() {
    const academicYears = await AcademicYear.findAll();
    return academicYears;
  }

  async findById(id) {
    const academicYear = await AcademicYear.findByPk(id);
    return academicYear;
  }

  async save(academicYear) {
    await academicYear.save();
    return academicYear;
  }

  async updateOne(id, year) {
    await AcademicYear.update({ year }, { where: { id } });
  }

  async deleteOne(id) {
    await AcademicYear.destroy({ where: { id } });
  }
}

module.exports = AcademicYearsService;
