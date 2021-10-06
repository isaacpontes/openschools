const { QueryTypes } = require('sequelize');
const School = require('../models/School');

class SchoolService {
  create (name, inep_code, address, user_id) {
    const school = School.build({ name, inep_code, address, user_id });
    return school;
  }

  async findAll () {
    const schools = await School.findAll({
      include: [
        { association: 'manager' }
      ]
    });
    return schools;
  }

  async findAllWithClassrooms () {
    const schools = await School.findAll({
      include: [
        { association: 'manager' },
        { association: 'classrooms' },
      ]
    });
    return schools;
  }

  async findByManager (user_id) {
    const schools = await School.findAll({ where: { user_id }});
    return schools;
  }

  async findByManagerWithClassrooms (user_id) {
    const schools = await School.findAll({
      where: { user_id },
      include: [
        { association: 'classrooms' }
      ]
    });
    return schools;
  }

  async findById (id) {
    const school = await School.findByPk(id, {
      include: [
        { association: 'manager' }
      ]
    });
    return school;
  }

  async findByIdWithClassrooms (id) {
    const school = await School.findByPk(id, {
      include: [
        { association: 'manager' },
        { association: 'classrooms' }
      ]
    });
    return school;
  }

  async save (school) {
    await school.save();
    return school;
  }

  async update (id, name, inep_code, address, user_id) {
    await School.update({ name, inep_code, address, user_id }, { where: { id } });
  }

  async delete (id) {
    await School.destroy({ where: { id }});
  }

  async getStudentsCountBySchool () {
    const schools = await School.sequelize.query(`
      SELECT
        "School".id,
        "School".name,
        COUNT("Enrollment".student_id) AS "count"
      FROM
        "schools" AS "School"
        LEFT JOIN "classrooms" AS "Classroom"
          ON "Classroom".school_id = "School".id
          LEFT JOIN "enrollments" AS "Enrollment"
            ON "Enrollment".classroom_id = "Classroom".id
      GROUP BY
        "School".id;
    `, {
      type: QueryTypes.SELECT
    });

    const total = schools.reduce((accum, current) => accum + Number(current.count), 0);

    return { quantities: schools, total };
  }
}

module.exports = SchoolService;
