const Employee = require('../models/Employee');

class EmployeeService {
  static create({ name, employee_code, position, role, bond, birthday, cpf, rg, ctps, elector_title, pis, address, phone, email, situation, admission_date, formation, complementary_formation, workload, fundeb, origin_sector_id, current_sector_id, shift, info }) {
    const employee = Employee.build();

    if (name) employee.name = name;
    if (employee_code) employee.employee_code = employee_code;
    if (address) employee.address = address;
    if (phone) employee.phone = phone;
    if (email) employee.email = email;
    if (birthday) employee.birthday = birthday;
    if (situation) employee.situation = situation;
    if (position) employee.position = position;
    if (role) employee.role = role;
    if (bond) employee.bond = bond;
    if (cpf) employee.cpf = cpf;
    if (rg) employee.rg = rg;
    if (ctps) employee.ctps = ctps;
    if (elector_title) employee.elector_title = elector_title;
    if (pis) employee.pis = pis;
    if (fundeb) employee.fundeb = fundeb;
    if (admission_date) employee.admission_date = admission_date;
    if (formation) employee.formation = formation;
    if (complementary_formation) employee.complementary_formation = complementary_formation;
    if (workload) employee.workload = workload;
    if (shift) employee.shift = shift;
    if (info) employee.info = info;
    if (origin_sector_id) employee.origin_sector_id = origin_sector_id;
    if (current_sector_id) employee.current_sector_id = current_sector_id;

    return employee;
  }

  static async findAll() {
    const employees = await Employee.findAll();
    return employees;
  }

  static async findAllWithSector() {
    const employees = await Employee.findAll({
      include: [
        { association: 'origin_sector' },
        { association: 'current_sector' }
      ]
    });
    return employees;
  }

  static async findOne(id) {
    const employees = await Employee.findByPk(id, {
      include: [
        { association: 'origin_sector' },
        { association: 'current_sector' }
      ]
    });
    return employees;
  }

  static async save(employee) {
    if (!employee.current_sector_id) {
      employee.current_sector_id = employee.origin_sector_id;
    }

    await employee.save();
    return employee;
  }

  static async deleteOne(id) {
    await Employee.destroy({ where: { id } });
  }
}

module.exports = EmployeeService;
