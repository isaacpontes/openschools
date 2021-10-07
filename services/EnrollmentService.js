const Enrollment = require("../models/Enrollment");

class EnrollmentService {
  static create(student_id, classroom_id, academic_year_id, status) {
    const enrollment = Enrollment.build({ status, student_id, classroom_id, academic_year_id });
    return enrollment;
  }

  static async findAll() {
    const enrollments = await Enrollment.findAll({
      include: [
        { association: 'academic_year' },
        { association: 'student' },
        { association: 'classroom' },
      ]
    });
    return enrollments;
  }

  static async findById(id) {
    const enrollment = await Enrollment.findByPk(id);
    return enrollment;
  }

  static async save(enrollment) {
    await enrollment.save();
    return enrollment;
  }

  static async updateOne(id, status) {
    await Enrollment.update({ status }, { where: { id } });
  }

  static async deleteOne(id) {
    await Enrollment.destroy({ where: { id } });
  }
}

module.exports = EnrollmentService;
