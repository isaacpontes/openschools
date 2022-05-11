const { QueryTypes } = require('sequelize');
const { Student } = require('../models');

module.exports = {
  create: (values) => {
    const student = Student.build();

    if (values.student_code) student.student_code = values.student_code;
    if (values.first_name) student.first_name = values.first_name;
    if (values.last_name) student.last_name = values.last_name;
    if (values.gender) student.gender = values.gender;
    if (values.phone) student.phone = values.phone;
    if (values.address) student.address = values.address;
    if (values.birthday) student.birthday = values.birthday;
    if (values.birth_place) student.birth_place = values.birth_place;
    if (values.father_name) student.father_name = values.father_name;
    if (values.father_ocupation) student.father_ocupation = values.father_ocupation;
    if (values.mother_name) student.mother_name = values.mother_name;
    if (values.mother_ocupation) student.mother_ocupation = values.mother_ocupation;
    if (values.blood_type) student.blood_type = values.blood_type;
    if (values.info) student.info = values.info;
    if (values.transport_id) student.transport_id = values.transport_id;

    return student;
  },

  findAll: async () => {
    const students = await Student.findAll();
    return students;
  },

  findAllWithAcademicYears: async () => {
    const students = await Student.findAll({
      include: [
        { association: 'academicYears' }
      ]
    });
    return students;
  },

  findAllFromManager: async (managerId) => {
    const students = await Student.sequelize.query(`
      SELECT
        "Student".*,
        "Enrollment".id AS enrollment_id,
        "Classroom".id AS classroom_id,
        "Classroom".name AS classroom_name,
        "School".id AS school_id,
        "School".name AS school_name,
        "School".user_id AS school_user_id
      FROM
        "students" AS "Student"
        LEFT JOIN "enrollments" AS "Enrollment"
          ON "Enrollment".student_id = "Student".id
        LEFT JOIN "classrooms" AS "Classroom"
          ON "Classroom".id = "Enrollment".classroom_id
        LEFT JOIN "schools" AS "School"
          ON "School".id = "Classroom".school_id
      WHERE
        "School".user_id = :managerId;
    `, {
      replacements: { managerId },
      type: QueryTypes.SELECT
    });

    return students;
  },

  findById: async (id) => {
    const student = await Student.findByPk(id, {
      include: 'transport'
    });
    return student;
  },

  save: async (student) => {
    await student.save();
    return student;
  },

  updateOne: async (id, student_code, first_name, last_name, gender, phone, address, birthday, birth_place, father_name, father_ocupation, mother_name, mother_ocupation, blood_type, info, transport_id) => {
    await Student.update({
      student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birth_place,
      father_name,
      father_ocupation,
      mother_name,
      mother_ocupation,
      blood_type,
      info,
      transport_id
    }, {
      where: { id }
    });
  },

  deleteOne: async (id) => {
    await Student.destroy({ where: { id } });
  }
}
