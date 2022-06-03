const { QueryTypes } = require('sequelize');
const School = require('../database/models/School');

module.exports = {
  create: (name, inep_code, address, user_id) => {
    const school = School.build({ name, inep_code, address, user_id });
    return school;
  },

  findAll: async () => {
    const schools = await School.findAll({
      include: [
        { association: 'manager' }
      ]
    });
    return schools;
  },

  findAllWithClassrooms: async () => {
    const schools = await School.findAll({
      include: [
        { association: 'manager' },
        { association: 'classrooms' },
      ]
    });
    return schools;
  },

  async findByManagerId(user_id) {
    const schools = await School.findAll({
      where: { user_id },
      order: [['name', 'ASC']]
    });
    return schools;
  },

  findByManagerWithClassrooms: async (user_id) => {
    const schools = await School.findAll({
      where: { user_id },
      include: [
        { association: 'classrooms' }
      ]
    });
    return schools;
  },

  findById: async (id) => {
    const school = await School.findByPk(id, {
      include: [
        { association: 'manager' }
      ]
    });
    return school;
  },

  async findByIdWithClassrooms(id) {
    const school = await School.findByPk(id, {
      include: [
        {
          association: 'classrooms',
          attributes: ['id', 'name', 'created_at', 'updated_at'],
          include: 'grade'
        }
      ]
    });
    return school;
  },

  save: async (school) => {
    await school.save();
    return school;
  },

  async addClassroom(name, grade_id, school_id) {
    const school = await School.findByPk(school_id);
    await school.createClassroom({ name, grade_id });
  },

  updateOne: async (id, name, inep_code, address, user_id) => {
    await School.update({ name, inep_code, address, user_id }, { where: { id } });
  },

  deleteOne: async (id) => {
    await School.destroy({ where: { id }});
  },

  getStudentsCountBySchool: async () => {
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
};
