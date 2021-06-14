const Student = require('../models/student');

module.exports = {
  create: function (enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom) {
    const student = new Student();
    if (typeof enrollment !== 'undefined') {
      student.enrollment = enrollment;
    }
    if (typeof firstName !== 'undefined') {
      student.firstName = firstName;
    }
    if (typeof lastName !== 'undefined') {
      student.lastName = lastName;
    }
    if (typeof gender !== 'undefined') {
      student.gender = gender;
    }
    if (typeof phone !== 'undefined') {
      student.phone = phone;
    }
    if (typeof address !== 'undefined') {
      student.address = address;
    }
    if (typeof birthday !== 'undefined') {
      student.birthday = birthday;
    }
    if (typeof birthPlace !== 'undefined') {
      student.birthPlace = birthPlace;
    }
    if (typeof fatherName !== 'undefined') {
      student.fatherName = fatherName;
    }
    if (typeof fatherOcupation !== 'undefined') {
      student.fatherOcupation = fatherOcupation;
    }
    if (typeof motherName !== 'undefined') {
      student.motherName = motherName;
    }
    if (typeof motherOcupation !== 'undefined') {
      student.motherOcupation = motherOcupation;
    }
    if (typeof bloodType !== 'undefined') {
      student.bloodType = bloodType;
    }
    if (typeof info !== 'undefined') {
      student.info = info;
    }
    if (typeof transport !== 'undefined') {
      student.transport = transport;
    }
    if (typeof school !== 'undefined') {
      student.school = school;
    }
    if (typeof classroom !== 'undefined') {
      student.classroom = classroom;
    }
    return student;
  },

  findAll: async function (populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const students = await Student.find({});
      return students;
    }
    const students = await Student.find({}).populate(populateOptions);
    return students;
  },

  findById: async function (id, populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const student = await Student.findById(id);
      return student;
    }
    const student = await Student.findById(id).populate(populateOptions);
    return student;
  },

  findByClassroomId: async function (classroomId) {
    const students = await Student.find({ classroom: classroomId });
    return students;
  },

  save: async function (student) {
    await student.save();
    return student;
  },

  update: async function (id, enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom) {
    await Student.findByIdAndUpdate(id, { enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom, updated: Date.now() });
  },

  delete: async function (id) {
    await Student.findByIdAndRemove(id);
  }
}
