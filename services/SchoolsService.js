const School = require('../models/School');

class SchoolsService {
  create = (name, inepCode, address, manager) => {
    const school = new School();
    if (typeof name !== 'undefined') {
      school.name = name;
    }
    if (typeof inepCode !== 'undefined') {
      school.inepCode = inepCode;
    }
    if (typeof address !== 'undefined') {
      school.address = address;
    }
    if (typeof manager !== 'undefined') {
      school.manager = manager;
    }
    return school;
  }

  findAll = async (populateOptions) => {
    if (typeof populateOptions === 'undefined') {
      const schools = await School.find({});
      return schools;
    }
    const schools = await School.find({}).populate(populateOptions);
    return schools;
  }

  findByManager = async (managerId) => {
    const schools = await School.find({ manager: managerId });
    return schools;
  }

  findById = async (id, populateOptions) => {
    if (typeof populateOptions === 'undefined') {
      const school = await School.findById(id);
      return school;
    }
    const school = await School.findById(id).populate(populateOptions);
    return school;
  }

  save = async (school) => {
    await school.save();
    return school;
  }

  update = async (id, name, inepCode, address, manager) => {
    await School.findByIdAndUpdate(id, { name, inepCode, address, manager, updated: Date.now() });
  }

  updateClassroom = async (classroom) => {
    await School.findOneAndUpdate(
      { '_id': classroom.school, 'classrooms._id': classroom._id },
      { '$set': {
        'classrooms.$.name': classroom.name,
        'classrooms.$.grade': classroom.grade,
        'classrooms.$.updated': classroom.updated
      }}
    );
  }

  delete = async (id) => {
    await School.findByIdAndRemove(id);
  }
}

module.exports = SchoolsService;
