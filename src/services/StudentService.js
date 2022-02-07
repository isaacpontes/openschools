const { QueryTypes } = require('sequelize');
const Student = require('../models/Student');

class StudentService {
  static create({ student_code, first_name, last_name, gender, phone, address, birthday, birth_place, father_name, father_ocupation, mother_name, mother_ocupation, blood_type, info, transport_id }) {
    const student = Student.build();

    if (student_code) student.student_code = student_code;
    if (first_name) student.first_name = first_name;
    if (last_name) student.last_name = last_name;
    if (gender) student.gender = gender;
    if (phone) student.phone = phone;
    if (address) student.address = address;
    if (birthday) student.birthday = birthday;
    if (birth_place) student.birth_place = birth_place;
    if (father_name) student.father_name = father_name;
    if (father_ocupation) student.father_ocupation = father_ocupation;
    if (mother_name) student.mother_name = mother_name;
    if (mother_ocupation) student.mother_ocupation = mother_ocupation;
    if (blood_type) student.blood_type = blood_type;
    if (info) student.info = info;
    if (transport_id) student.transport_id = transport_id;

    return student;
  }

  static async findAll() {
    const students = await Student.findAll();
    return students;
  }

  static async findAllWithAcademicYears() {
    const students = await Student.findAll({
      include: [
        { association: 'academicYears' }
      ]
    });
    return students;
  }

  static async findAllFromManager(managerId) {
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
  }

  static async findById(id) {
    const student = await Student.findByPk(id, {
      include: 'transport'
    });
    return student;
  }

  static async save(student) {
    await student.save();
    return student;
  }

  static async updateOne(id, student_code, first_name, last_name, gender, phone, address, birthday, birth_place, father_name, father_ocupation, mother_name, mother_ocupation, blood_type, info, transport_id) {
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
  }

  static async deleteOne(id) {
    await Student.destroy({ where: { id } });
  }
}

module.exports = StudentService;
