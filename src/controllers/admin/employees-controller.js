const EmployeeService = require("../../services/EmployeeService");

module.exports = {
  // Return a list of all employees
  // GET /api/admin/employees
  index: async (req, res) => {
    try {
      const employees = await EmployeeService.findAll();
      return res.json(employees);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar funcionários',
        error: error.message
      });
    }
  },

  // Save a new employee to the database
  // POST /api/admin/employees
  save: async (req, res) => {
    const {
      name,
      employee_code,
      address,
      phone,
      email,
      birthday,
      situation,
      position,
      role,
      bond,
      cpf,
      rg,
      ctps,
      elector_title,
      pis,
      fundeb,
      admission_date,
      formation,
      complementary_formation,
      workload,
      shift,
      info,
      origin_sector_id,
      current_sector_id
    } = req.body;

    const employee = EmployeeService.create({ name, employee_code, position, role, bond, birthday, cpf, rg, ctps, elector_title, pis, address, phone, email, situation, admission_date, formation, complementary_formation, workload, fundeb, origin_sector_id, current_sector_id, shift, info });

    try {
      await EmployeeService.save(employee);

      return res.json(employee);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar funcionário',
        error: error.message
      });
    }
  },

  // Render a single employee
  // GET /admin/employees/:id
  show: async (req, res) => {
    const { id } = req.params;

    try {
      const employee = await EmployeeService.findOne(id);
      return res.json(employee);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar funcionário',
        error: error.message
      });
    }
  },

  // Update a employee in the database
  // PUT /admin/employees/:id
  update: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      employee_code,
      address,
      phone,
      email,
      birthday,
      situation,
      position,
      role,
      bond,
      cpf,
      rg,
      ctps,
      elector_title,
      pis,
      fundeb,
      admission_date,
      formation,
      complementary_formation,
      workload,
      shift,
      info,
      origin_sector_id,
      current_sector_id
    } = req.body;

    try {
      const employee = await EmployeeService.findOne(id);

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

      await EmployeeService.save(employee);

      return res.json(employee);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar funcionário',
        error: error.message
      });
    }
  },

  // Delete employee from database
  // DELETE /admin/employees/:id
  delete: async (req, res) => {
    const { id } = req.params;
  
    try {
      await EmployeeService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir funcionário',
        error: error.message
      });
    }
  }
}
