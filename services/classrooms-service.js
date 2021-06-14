const Classroom = require('../models/classroom');

module.exports = {
  create: function (name, grade, school) {
    const classroom = new Classroom();
    if (typeof name !== 'undefined') {
      classroom.name = name;
    }
    if (typeof grade !== 'undefined') {
      classroom.grade = grade;
    }
    if (typeof school !== 'undefined') {
      classroom.school = school;
    }
    return classroom;
  },

  findAll: async function (populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const classrooms = await Classroom.find({});
      return classrooms;
    }
    const classrooms = await Classroom.find({}).populate(populateOptions);
    return classrooms;
  },

  findById: async function (id, populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const classroom = await Classroom.findById(id);
      return classroom;
    }
    const classroom = await Classroom.findById(id).populate(populateOptions);
    return classroom;
  },

  findBySchoolId: async function (schoolId, populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const classroom = await Classroom.find({ school: schoolId });
      return classroom;
    }
    const classroom = await Classroom.find({ school: schoolId }).populate(populateOptions);
    return classroom;
  },

  save: async function (name, grade, school) {
    const classroom = this.create(name, grade, school);
    await classroom.save();
    return classroom;
  },

  update: async function (id, name, grade, school) {
    await Classroom.findByIdAndUpdate(id, { name, grade, school, updated: Date.now() });
  },

  delete: async function (id) {
    await Classroom.findByIdAndRemove(id);
  }
}
