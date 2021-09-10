const Classroom = require('../models/Classroom');
const SchoolsService = require('./SchoolsService');

class ClassroomsService {
  create = (name, grade, school) => {
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
  }

  findAll = async (populateOptions) => {
    if (typeof populateOptions === 'undefined') {
      const classrooms = await Classroom.find({});
      return classrooms;
    }
    const classrooms = await Classroom.find({}).populate(populateOptions);
    return classrooms;
  }

  findById = async (id, populateOptions) => {
    if (typeof populateOptions === 'undefined') {
      const classroom = await Classroom.findById(id);
      return classroom;
    }
    const classroom = await Classroom.findById(id).populate(populateOptions);
    return classroom;
  }

  findBySchoolId = async (schoolId, populateOptions) => {
    if (typeof populateOptions === 'undefined') {
      const classroom = await Classroom.find({ school: schoolId });
      return classroom;
    }
    const classroom = await Classroom.find({ school: schoolId }).populate(populateOptions);
    return classroom;
  }

  findByUserId = async (userId) => {
    const schoolsService = new SchoolsService();

    const userSchools = await schoolsService.findByManager(userId);

    const schoolIds = userSchools.map((school) => school._id);

    const classrooms = await this.findAllInSchools(schoolIds);

    return classrooms;
  }

  findAllInSchools = async (schoolIds) => {
    const schoolsClassrooms = await Classroom.find({ school: { $in: schoolIds } }).populate(['grade', 'school']);
    return schoolsClassrooms;
  }

  save = async (classroom) => {
    // Save on Classroom
    await classroom.save();

    // Save on School
    const schoolsService = new SchoolsService();
    const school = await schoolsService.findById(classroom.school);
    school.classrooms.push(classroom);
    await school.save();

    return classroom;
  }

  update = async (id, name, grade) => {
    // Update on Classroom
    const classroom = await Classroom.findByIdAndUpdate(id, {
      name,
      grade,
      updated: Date.now()
    }, {
      new: true
    });
    
    // Update on School
    const schoolsService = new SchoolsService();
    await schoolsService.updateClassroom(classroom);
  }

  delete = async (id) => {
    // Remove from Classroom
    const classroom = await Classroom.findByIdAndRemove(id);

    // Remove from School
    const schoolsService = new SchoolsService();
    const school = await schoolsService.findById(classroom.school);
    const classroomToRemove = school.classrooms.indexOf(classroom._id);
    school.classrooms.splice(classroomToRemove, 1);
    await school.save();
  }
}

module.exports = ClassroomsService;
