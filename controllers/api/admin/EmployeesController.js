class EmployeesController {
  constructor (service) {
    this.service = service;
  }

  // Return a list of all employees
  // GET /api/admin/employees
  findAll = async (req, res) => {
    try {
      const employees = await this.service.findAll(true, ['originSector', 'currentSector', 'classroom']);
      return res.json(employees);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar funcionários',
        error: error.message
      });
    }
  }

  // Save a new employee to the database
  // POST /api/admin/employees
  save = async (req, res) => {
    const {
      name, enrollment, position, role, bond, cpf, rg, ctps, electorTitle, pis, address, phone,
      email, birthday, situation, admissionDate, formation, complementaryFormation, workload, fundeb,
      originSector, currentSector, school, classroom, shift, info
    } = req.body;

    const employee = this.service.create(name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info);

    try {
      await this.service.save(employee);

      return res.json(employee);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar funcionário',
        error: error.message
      });
    }
  }

  // Render a single employee
  // GET /admin/employees/:id
  findById = async (req, res) => {
    const { id } = req.params;

    try {
      const employee = await this.service.findOne(id, true, [ 'originSector', 'currentSector', 'school', 'classroom' ]);
      return res.json(employee);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar funcionário',
        error: error.message
      });
    }
  }

  // Update a employee in the database
  // PUT /admin/employees/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info } = req.body;

    try {
      const employee = await this.service.findOne(id);

      if (name) employee.name = name;
      if (enrollment) employee.enrollment = enrollment;
      if (position) employee.position = position;
      if (role) employee.role = role;
      if (bond) employee.bond = bond;
      if (birthday) employee.birthday = birthday;
      if (cpf) employee.cpf = cpf;
      if (rg) employee.rg = rg;
      if (ctps) employee.ctps = ctps;
      if (electorTitle) employee.electorTitle = electorTitle;
      if (pis) employee.pis = pis;
      if (address) employee.address = address;
      if (phone) employee.phone = phone;
      if (email) employee.email = email;
      if (situation) employee.situation = situation;
      if (admissionDate) employee.admissionDate = admissionDate;
      if (formation) employee.formation = formation;
      if (complementaryFormation) employee.complementaryFormation = complementaryFormation;
      if (workload) employee.workload = workload;
      if (fundeb) employee.fundeb = fundeb;
      if (originSector) employee.originSector = originSector;
      if (currentSector) employee.currentSector = currentSector;
      if (school) employee.school = school;
      if (classroom) employee.classroom = classroom;
      if (shift) employee.shift = shift;
      if (info) employee.info = info;

      await this.service.save(employee);

      return res.json(employee);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar funcionário',
        error: error.message
      });
    }
  }

  // Delete employee from database
  // DELETE /admin/employees/:id
  delete = async (req, res) => {
    const { id } = req.params;
  
    try {
      await this.service.delete(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir funcionário',
        error: error.message
      });
    }
  }
}

module.exports = EmployeesController;
