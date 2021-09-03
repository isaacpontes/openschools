const Controller = require('../Controller');
const dayjs = require('dayjs');
const sectorsService = require('../../services/sectors-service');
const schoolsService = require('../../services/schools-service');
const classroomsService = require('../../services/classrooms-service');

class EmployeesController extends Controller {
  // Render a list of all employees
  // GET /employees
  index = async (req, res) => {
    try {
      const employees = await this.service.findAll(true, { path: 'currentSector'});

      return res.render('admin/employees/index', { employees });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new employee to the database
  // POST /employees
  save = async (req, res) => {
    const {
      name, enrollment, position, role, bond, cpf, rg, ctps, electorTitle, pis, address, phone,
      email, situation, admissionDate, formation, complementaryFormation, workload, fundeb,
      originSector, currentSector, school, classroom, shift, info
    } = req.body.employee;

    const birthday = dayjs(req.body.employee.birthday);

    const employee = await this.service.create(name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info);

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
    const employee = this.service.create();
    try {
      const allSectors = await sectorsService.findAll();
      const allSchools = await schoolsService.findAll();
      const allClasses = await classroomsService.findAll({ path: 'school' });

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
      const employee = await this.service.findOne(id, true, [ 'originSector', 'currentSector', 'school', 'classroom' ]);

      return res.render('admin/employees/show', { employee, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render employee edit form
  // GET /admin/employees/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const employee = await this.service.findOne(id);
      const allSectors = await sectorsService.findAll();
      const allSchools = await schoolsService.findAll();
      const allClasses = await classroomsService.findAll({ path: 'school' });

      return res.render('admin/employees/edit', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update a employee in the database
  // PUT /admin/employees/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info } = req.body.employee;

    try {
      await this.service.update(id, name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info);

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
