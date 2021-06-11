const Employee = require('../models/employee');
const Sector = require('../models/sector');
const School = require('../models/school');
const Classroom = require('../models/classroom');
const mongoose = require('mongoose');

module.exports = {
  create: function () {
    const employee = new Employee();
    return employee;
  },

  findAll: async function (populate = false, options = {}) {
    if (populate === false) {
      const employees = await Employee.find({});
      return employees;
    }
    const employees = await Employee.find({}).populate(options);
    return employees;
  },

  findOne: async function (id, populate = false, options = {}) {
    if (populate === false) {
      const employees = await Employee.findById(id);
      return employees;
    }
    const employees = await Employee.findById(id).populate(options);
    return employees;
  },

  save: async function (name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info) {
    const employee = new Employee({ name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, info });

    if (mongoose.isValidObjectId(currentSector)) {
      employee.currentSector = currentSector;
    } else {
      employee.currentSector = originSector;
    }
    if (mongoose.isValidObjectId(school)) {
      employee.school = school;
    }
    if (mongoose.isValidObjectId(classroom)) {
      employee.classroom = classroom;
    }
    if (mongoose.isValidObjectId(shift)) {
      employee.shift = shift;
    }

    await employee.save();
    return employee;
  },
  
  update: async function (id, name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info) {
    await Employee.findByIdAndUpdate(id, { 
      name, 
      enrollment, 
      position, 
      role, 
      bond, 
      birthday, 
      cpf, 
      rg, 
      ctps, 
      electorTitle, 
      pis, 
      address, 
      phone, 
      email, 
      situation, 
      admissionDate, 
      formation, 
      complementaryFormation, 
      workload, 
      fundeb, 
      originSector, 
      currentSector, 
      school, 
      classroom, 
      shift, 
      info,
      updated: Date.now()
    });
  },

  delete: async function (id) {
    await Employee.findByIdAndRemove(id);
  }
}
