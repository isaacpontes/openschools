const Controller = require('../Controller');
const dayjs = require('dayjs');
const SectorService = require('../../services/SectorService');
const SchoolService = require('../../services/SchoolService');
const ClassroomService = require('../../services/ClassroomService');

class EmployeesController extends Controller {
  // Render a list of all employees
  // GET /employees
  index = async (req, res) => {
    try {
      const employees = await this.service.findAllWithSector();

      return res.render('admin/employees/index', { employees });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new employee to the database
  // POST /employees
  save = async (req, res) => {
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
    } = req.body.employee;

    // const birthday = dayjs(req.body.employee.birthday);

    const employee = this.service.create({ name, employee_code, position, role, bond, birthday, cpf, rg, ctps, elector_title, pis, address, phone, email, situation, admission_date, formation, complementary_formation, workload, fundeb, origin_sector_id, current_sector_id, shift, info });

    try {
      await this.service.save(employee);

      req.flash('success', 'Funcionário salvo com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      req.flash('error', 'Erro ao salvar funcionário.');
      return res.redirect('/admin/employees/create');
    }
  }

  // Render the create employee form
  // GET /admin/employees/create
  create = async (req, res) => {
    const employee = this.service.create({});

    const classroomService = new ClassroomService();
    const schoolService = new SchoolService();
    const sectorService = new SectorService();

    try {
      const allSectors = await sectorService.findAll();
      const allSchools = await schoolService.findAll();
      const allClasses = await classroomService.findAll({ path: 'school' });

      return res.render('admin/employees/create', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render a single employee
  // GET /admin/employees/:id
  show = async (req, res) => {
    const { id } = req.params;

    try {
      const employee = await this.service.findOne(id, true, [ 'origin_sector_id', 'current_sector_id', 'school', 'classroom' ]);

      return res.render('admin/employees/show', { employee, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render employee edit form
  // GET /admin/employees/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    const classroomService = new ClassroomService();
    const schoolService = new SchoolService();
    const sectorService = new SectorService();

    try {
      const employee = await this.service.findOne(id);
      const allSectors = await sectorService.findAll();
      const allSchools = await schoolService.findAll();
      const allClasses = await classroomService.findAll({ path: 'school' });

      return res.render('admin/employees/edit', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update a employee in the database
  // PUT /admin/employees/:id
  update = async (req, res) => {
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
    } = req.body.employee;

    try {

      const employee = await this.service.findOne(id);

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

      await this.service.save(employee);

      req.flash('success', 'Funcionário atualizado com sucesso.');

      return res.redirect('/admin/employees');

    } catch (error) {

      req.flash('error', 'Erro ao atualizar funcionário.');

      return res.redirect(`/admin/employees/${id}/edit`);
    }
  }

  // Delete employee from database
  // DELETE /admin/employees/:id
  delete = async (req, res) => {
    const { id } = req.params;
  
    try {
      await this.service.delete(id);

      req.flash('success', 'Funcionário excluído com sucesso.');

      return res.redirect('/admin/employees');

    } catch (error) {

      req.flash('error', 'Erro ao excluir funcionário.');

      return res.redirect('/admin/employees');
    }
  }
}

module.exports = EmployeesController;
