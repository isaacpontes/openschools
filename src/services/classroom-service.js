const { QueryTypes } = require('sequelize');
const Classroom = require('../database/models/Classroom');

module.exports = {
  create: (name, grade_id, school_id) => {
    const classroom = Classroom.build({ name, grade_id, school_id });
    return classroom;
  },

  findAll: async () => {
    const classrooms = await Classroom.findAll({
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classrooms;
  },

  findById: async (id) => {
    const classroom = await Classroom.findByPk(id, {
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classroom;
  },

  findBySchoolId: async (school_id) => {
    const classrooms = await Classroom.findAll({ where: { school_id } });
    return classrooms;
  },

  findByUserId: async (userId) => {
    const classrooms = await Classroom.sequelize.query(
      'SELECT "Classroom"."id", "Classroom"."name", "Classroom"."school_id", "School"."name" AS "school_name" FROM "classrooms" AS "Classroom", "schools" AS "School" WHERE "Classroom"."school_id" = "School"."id" AND "School"."user_id" = :userId',
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
    );

    return classrooms;
  },

  save: async (classroom) => {
    await classroom.save();
    return classroom;
  },

  updateOne: async (id, name, grade_id) => {
    await Classroom.update({ name, grade_id }, { where: { id } });
  },

  deleteOne: async (id) => {
    await Classroom.destroy({ where: { id } });
  }
};
