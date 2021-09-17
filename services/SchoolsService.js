const Classroom = require('../models/Classroom');
const School = require('../models/School');

class SchoolsService {
  create = (name, inep_code, address, user_id) => {
    const school = School.build({ name, inep_code, address, user_id });
    return school;
  }

  findAll = async () => {
    const schools = await School.findAll();
    return schools;
  }

  findByManager = async (user_id) => {
    const schools = await School.findAll({ where: { user_id }});
    return schools;
  }

  findById = async (id) => {
    const school = await School.findByPk(id);
    return school;
  }

  findByIdWithClassrooms = async (id) => {
    const school = await School.findByPk(id, {
      include: [
        {
          model: Classroom, as: 'classrooms'
        }
      ]
    });
    return school;
  }

  save = async (school) => {
    await school.save();
    return school;
  }

  update = async (id, name, inep_code, address, user_id) => {
    await School.update({ name, inep_code, address, user_id }, { where: { id } });
  }

  delete = async (id) => {
    await School.destroy({ where: { id }});
  }
}

module.exports = SchoolsService;
