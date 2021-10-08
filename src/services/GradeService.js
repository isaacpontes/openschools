const { QueryTypes } = require('sequelize');
const Grade = require('../models/Grade');

class GradeService {
  static create(name) {
    const grade = Grade.build({ name });
    return grade;
  }

  static async findAll() {
    const grades = await Grade.findAll();
    return grades;
  }

  static async findOne(id) {
    const grade = await Grade.findByPk(id);
    return grade;
  }

  static async save(grade) {
    await grade.save();
    return grade;
  }

  static async updateOne(id, name) {
    await Grade.update({ name }, { where: { id } });
  }

  static async deleteOne(id) {
    await Grade.destroy({ where: { id } });
  }

  static async getStudentsCountByGrade() {
    const grades = await Grade.sequelize.query(`
      SELECT
        "Grade".id,
        "Grade".name,
        COUNT("Enrollment".student_id) AS "count"
      FROM
        "grades" AS "Grade"
        LEFT JOIN "classrooms" AS "Classroom"
          ON "Classroom".grade_id = "Grade".id
          LEFT JOIN "enrollments" AS "Enrollment"
            ON "Enrollment".classroom_id = "Classroom".id
      GROUP BY
        "Grade".id;
    `, {
      type: QueryTypes.SELECT
    });

    const total = grades.reduce((accum, current) => accum + Number(current.count), 0);

    return { quantities: grades, total };
  }
}

module.exports = GradeService;
