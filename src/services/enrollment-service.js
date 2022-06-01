const Enrollment = require('../database/models/Enrollment');

module.exports = {
  create: (student_id, classroom_id, academic_year_id, status) => {
    const enrollment = Enrollment.build({ status, student_id, classroom_id, academic_year_id });
    return enrollment;
  },

  findAll: async () => {
    const enrollments = await Enrollment.findAll({
      include: [
        { association: 'academic_year' },
        { association: 'student' },
        { association: 'classroom' },
      ]
    });
    return enrollments;
  },

  findById: async (id) => {
    const enrollment = await Enrollment.findByPk(id);
    return enrollment;
  },

  save: async (enrollment) => {
    await enrollment.save();
    return enrollment;
  },

  updateOne: async (id, status) => {
    await Enrollment.update({ status }, { where: { id } });
  },

  deleteOne: async (id) => {
    await Enrollment.destroy({ where: { id } });
  }
}
