const Employee = require('../database/models/Employee');

module.exports = {
  create: (values) => {
    const employee = Employee.build();

    if (values.name) employee.name = values.name;
    if (values.employee_code) employee.employee_code = values.employee_code;
    if (values.address) employee.address = values.address;
    if (values.phone) employee.phone = values.phone;
    if (values.email) employee.email = values.email;
    if (values.birthday) employee.birthday = values.birthday;
    if (values.situation) employee.situation = values.situation;
    if (values.position) employee.position = values.position;
    if (values.role) employee.role = values.role;
    if (values.bond) employee.bond = values.bond;
    if (values.cpf) employee.cpf = values.cpf;
    if (values.rg) employee.rg = values.rg;
    if (values.ctps) employee.ctps = values.ctps;
    if (values.elector_title) employee.elector_title = values.elector_title;
    if (values.pis) employee.pis = values.pis;
    if (values.fundeb) employee.fundeb = values.fundeb;
    if (values.admission_date) employee.admission_date = values.admission_date;
    if (values.formation) employee.formation = values.formation;
    if (values.complementary_formation) employee.complementary_formation = values.complementary_formation;
    if (values.workload) employee.workload = values.workload;
    if (values.shift) employee.shift = values.shift;
    if (values.info) employee.info = values.info;
    if (values.origin_sector_id) employee.origin_sector_id = values.origin_sector_id;
    if (values.current_sector_id) employee.current_sector_id = values.current_sector_id;

    return employee;
  },

  findAll: async () => {
    const employees = await Employee.findAll();
    return employees;
  },

  findAllWithSector: async () => {
    const employees = await Employee.findAll({
      include: [
        { association: 'origin_sector' },
        { association: 'current_sector' }
      ]
    });
    return employees;
  },

  findOne: async (id) => {
    const employees = await Employee.findByPk(id, {
      include: [
        { association: 'origin_sector' },
        { association: 'current_sector' }
      ]
    });
    return employees;
  },

  save: async (employee) => {
    if (!employee.current_sector_id) {
      employee.current_sector_id = employee.origin_sector_id;
    }

    await employee.save();
    return employee;
  },

  deleteOne: async (id) => {
    await Employee.destroy({ where: { id } });
  }
};
