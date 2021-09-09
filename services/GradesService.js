const Grade = require('../models/Grade');

class GradesService {
  create = (name) => {
    const grade = new Grade();
    if (typeof name !== 'undefined') {
      grade.name = name;
    }
    return grade;
  }

  findAll = async () => {
    const grades = await Grade.find({});
    return grades;
  }

  findOne = async (id) => {
    const grade = await Grade.findById(id);
    return grade;
  }

  save = async (grade) => {
    await grade.save();
    return grade;
  }

  updateOne = async (id, name) => {
    await Grade.findByIdAndUpdate(id, { name, updated: Date.now() });
  }

  deleteOne = async (id) => {
    await Grade.findByIdAndRemove(id);
  }
}
module.exports = GradesService;
