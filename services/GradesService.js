const Grade = require('../models/Grade');

class GradesService {
  create = (name) => {
    const grade = Grade.build({ name });
    return grade;
  }

  findAll = async () => {
    const grades = await Grade.findAll();
    return grades;
  }

  findOne = async (id) => {
    const grade = await Grade.findByPk(id);
    return grade;
  }

  save = async (grade) => {
    await grade.save();
    return grade;
  }

  updateOne = async (id, name) => {
    await Grade.update({ name }, { where: { id } });
  }

  deleteOne = async (id) => {
    await Grade.destroy({ where: { id } });
  }
}

module.exports = GradesService;
