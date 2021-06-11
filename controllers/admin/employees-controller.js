const dayjs = require('dayjs');
const Employee = require('../../models/employee');
const Sector = require('../../models/sector');
const School = require('../../models/school');
const Classroom = require('../../models/classroom');
const employeesService = require('../../services/employees-service');
const sectorsService = require('../../services/sectors-service');

module.exports = {
  // Render a list of all employees
  // GET /employees
  index: async function (req, res) {
    try {
      const employees = await employeesService.findAll(true, { path: 'currentSector'});
      return res.render('admin/employees/index', { employees });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Save a new employee to the database
  // POST /employees
  save: async function (req, res) {
    const {
      name, enrollment, position, role, bond, cpf, rg, ctps, electorTitle, pis, address, phone,
      email, situation, admissionDate, formation, complementaryFormation, workload, fundeb,
      originSector, currentSector, school, classroom, shift, info
    } = req.body.employee;
    const birthday = dayjs(req.body.employee.birthday);
    try {
      await employeesService.save(name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info);
      req.flash('success', 'Funcionário salvo com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      req.flash('error', 'Erro ao salvar funcionário.');
      return res.redirect('/admin/employees/new');
    }
  },

  // Render the new employee form
  // GET /admin/employees/new
  new: async function (req, res) {
    const employee = employeesService.create();
    try {
      const allSectors = await sectorsService.findAll();
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');
      return res.render('admin/employees/new', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Render a single employee
  // GET /admin/employees/:id
  show: async function (req, res) {
    const { id } = req.params;
    try {
      const employee = await employeesService.findOne(id, true, [ 'originSector', 'currentSector', 'school', 'classroom' ]);
      return res.render('admin/employees/show', { employee, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Render employee edit form
  // GET /admin/employees/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    try {
      const allSectors = await sectorsService.findAll();
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');
      const employee = await Employee.findById(id);
      return res.render('admin/employees/edit', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Update a employee in the database
  // PUT /admin/employees/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info } = req.body.employee;
    try {
      await employeesService.update(id, name, enrollment, position, role, bond, birthday, cpf, rg, ctps, electorTitle, pis, address, phone, email, situation, admissionDate, formation, complementaryFormation, workload, fundeb, originSector, currentSector, school, classroom, shift, info);
      req.flash('success', 'Funcionário atualizado com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar funcionário.');
      return res.render('admin/employees/edit');
    }
  },

  // Delete employee from database
  // DELETE /admin/employees/:id
  delete: async function (req, res) {
    const { id } = req.params;
  
    try {
      await employeesService.delete(id);
      req.flash('success', 'Funcionário excluído com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      req.flash('error', 'Erro ao excluir funcionário.');
      return res.redirect('/admin/employees');
    }
  }
};
