const { QueryTypes } = require('sequelize');
const Classroom = require('../models/Classroom');

class ClassroomService {
  create (name, grade_id, school_id) {
    const classroom = Classroom.build({ name, grade_id, school_id });
    return classroom;
  }

  async findAll () {
    const classrooms = await Classroom.findAll({
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classrooms;
  }

  async findById (id) {
    const classroom = await Classroom.findByPk(id, {
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classroom;
  }

  async findBySchoolId (school_id) {
    const classrooms = await Classroom.findAll({ where: { school_id } });
    return classrooms;
  }

  async findByUserId (userId) {
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

  async save (classroom) {
    await classroom.save();
    return classroom;
  }

  async update (id, name, grade_id) {
    await Classroom.update({ name, grade_id }, { where: { id } });
  }

  async delete (id) {
    await Classroom.destroy({ where: { id } });
  }
}

module.exports = ClassroomService;
