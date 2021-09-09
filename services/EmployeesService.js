const Employee = require('../models/Employee');
const mongoose = require('mongoose');

class EmployeesService {
  create = (name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info) => {
    const employee = new Employee();

    if (typeof name !== 'undefined') employee.name = name;
    if (typeof enrollment !== 'undefined') employee.enrollment = enrollment;
    if (typeof position !== 'undefined') employee.position = position;
    if (typeof role !== 'undefined') employee.role = role;
    if (typeof bond !== 'undefined') employee.bond = bond;
    if (typeof birthday !== 'undefined') employee.birthday = birthday;
    if (typeof cpf !== 'undefined') employee.cpf = cpf;
    if (typeof rg !== 'undefined') employee.rg = rg;
    if (typeof ctps !== 'undefined') employee.ctps = ctps;
    if (typeof electorTitle !== 'undefined') employee.electorTitle = electorTitle;
    if (typeof pis !== 'undefined') employee.pis = pis;
    if (typeof address !== 'undefined') employee.address = address;
    if (typeof phone !== 'undefined') employee.phone = phone;
    if (typeof email !== 'undefined') employee.email = email;
    if (typeof situation !== 'undefined') employee.situation = situation;
    if (typeof admissionDate !== 'undefined') employee.admissionDate = admissionDate;
    if (typeof formation !== 'undefined') employee.formation = formation;
    if (typeof complementaryFormation !== 'undefined') employee.complementaryFormation = complementaryFormation;
    if (typeof workload !== 'undefined') employee.workload = workload;
    if (typeof fundeb !== 'undefined') employee.fundeb = fundeb;
    if (typeof originSector !== 'undefined') employee.originSector = originSector;
    if (typeof currentSector !== 'undefined') employee.currentSector = currentSector;
    if (typeof school !== 'undefined') employee.school = school;
    if (typeof classroom !== 'undefined') employee.classroom = classroom;
    if (typeof shift !== 'undefined') employee.shift = shift;
    if (typeof info !== 'undefined') employee.info = info;

    return employee;
  }

  findAll = async (populate = false, options = {}) => {
    if (populate === false) {
      const employees = await Employee.find({});
      return employees;
    }
    const employees = await Employee.find({}).populate(options);
    return employees;
  }

  findOne = async (id, populate = false, options = {}) => {
    if (populate === false) {
      const employees = await Employee.findById(id);
      return employees;
    }
    const employees = await Employee.findById(id).populate(options);
    return employees;
  }

  save = async (employee) => {
    if (typeof employee.currentSector === 'undefined' && mongoose.isValidObjectId(employee.originSector)) {
      employee.currentSector = employee.originSector;
    }

    // if (mongoose.isValidObjectId(school)) {
    //   employee.school = school;
    // }
    // if (mongoose.isValidObjectId(classroom)) {
    //   employee.classroom = classroom;
    // }

    await employee.save();
    return employee;
  }

  update = async (id, name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info) => {
    
    
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
  }

  delete = async (id) => {
    await Employee.findByIdAndRemove(id);
  }
}

module.exports = EmployeesService;
