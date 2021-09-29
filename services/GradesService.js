const { QueryTypes } = require('sequelize');
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

  getStudentsCountByGrade = async () => {
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

module.exports = GradesService;
