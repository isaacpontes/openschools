const { QueryTypes } = require('sequelize');
const Classroom = require('../models/Classroom');

class ClassroomsService {
  create = (name, grade_id, school_id) => {
    const classroom = Classroom.build({ name, grade_id, school_id });
    return classroom;
  }

  findAll = async () => {
    const classrooms = await Classroom.findAll({
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classrooms;
  }

  findById = async (id) => {
    const classroom = await Classroom.findByPk(id, {
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classroom;
  }

  findBySchoolId = async (school_id) => {
    const classrooms = await Classroom.findAll({ where: { school_id } });
    return classrooms;
  }

  findByUserId = async (userId) => {
    const classrooms = await Classroom.sequelize.query(
      'SELECT "Classroom"."id", "Classroom"."name", "School"."name" AS "school_name" FROM "classrooms" AS "Classroom", "schools" AS "School" WHERE "Classroom"."school_id" = "School"."id" AND "School"."user_id" = :userId',
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
    );

    console.log(classrooms)

    return classrooms;
  }

  save = async (classroom) => {
    await classroom.save();
    return classroom;
  }

  update = async (id, name, grade_id) => {
    await Classroom.update({ name, grade_id }, { where: { id } });
  }

  delete = async (id) => {
    await Classroom.destroy({ where: { id } });
  }
}

module.exports = ClassroomsService;
