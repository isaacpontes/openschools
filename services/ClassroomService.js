const { QueryTypes } = require('sequelize');
const Classroom = require('../models/Classroom');

class ClassroomService {
  static create(name, grade_id, school_id) {
    const classroom = Classroom.build({ name, grade_id, school_id });
    return classroom;
  }

  static async findAll() {
    const classrooms = await Classroom.findAll({
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classrooms;
  }

  static async findById(id) {
    const classroom = await Classroom.findByPk(id, {
      include: [
        { association: 'grade' },
        { association: 'school' }
      ]
    });
    return classroom;
  }

  static async findBySchoolId(school_id) {
    const classrooms = await Classroom.findAll({ where: { school_id } });
    return classrooms;
  }

  static async findByUserId(userId) {
    const classrooms = await Classroom.sequelize.query(
      'SELECT "Classroom"."id", "Classroom"."name", "Classroom"."school_id", "School"."name" AS "school_name" FROM "classrooms" AS "Classroom", "schools" AS "School" WHERE "Classroom"."school_id" = "School"."id" AND "School"."user_id" = :userId',
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
    );

    return classrooms;
  }

  static async save(classroom) {
    await classroom.save();
    return classroom;
  }

  static async updateOne(id, name, grade_id) {
    await Classroom.update({ name, grade_id }, { where: { id } });
  }

  static async deleteOne(id) {
    await Classroom.destroy({ where: { id } });
  }
}

module.exports = ClassroomService;
