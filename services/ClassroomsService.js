const { QueryTypes } = require('sequelize');
const Classroom = require('../models/Classroom');
const SchoolsService = require('./SchoolsService');

class ClassroomsService {
  create = (name, grade_id, school_id) => {
    const classroom = Classroom.build({ name, grade_id, school_id });
    return classroom;
  }

  findAll = async () => {
    const classrooms = await Classroom.findAll();
    return classrooms;
  }

  findById = async (id) => {
    const classroom = await Classroom.findByPk(id);
    return classroom;
  }

  findBySchoolId = async (school_id) => {
    const classrooms = await Classroom.findAll({ where: { school_id } });
    return classrooms;
  }

  findByUserId = async (userId) => {
    // const schoolsService = new SchoolsService();
    // const userSchools = await schoolsService.findByManager(userId);

    // const schoolIds = userSchools.map((school) => school._id);

    // const classrooms = await this.findAllInSchools(schoolIds);

    const classrooms = await Classroom.sequelize.query(
      'SELECT * FROM "classrooms" AS "Classroom", "schools" AS "School" WHERE "Classroom"."school_id" = "School"."id" AND "School"."user_id" = :userId',
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
    );

    return classrooms;
  }

  findAllInSchools = async (schoolIds) => {
    const schoolsClassrooms = await Classroom.find({ school: { $in: schoolIds } }).populate(['grade', 'school']);
    return schoolsClassrooms;
  }

  save = async (classroom) => {
    // Save on Classroom
    await classroom.save();
    return classroom;
  }

  update = async (id, name, grade_id) => {
    // Update on Classroom
    await Classroom.update({ name, grade_id }, { where: { id } });
    // const classroom = await Classroom.findByIdAndUpdate(id, {
    //   name,
    //   grade,
    //   updated: Date.now()
    // }, {
    //   new: true
    // });
  }

  delete = async (id) => {
    // Remove from Classroom
    await Classroom.destroy({ where: { id } });
    // const classroom = await Classroom.findByIdAndRemove(id);
  }
}

module.exports = ClassroomsService;
