const dayjs = require('dayjs');
const Employee = require('../../models/employee');
const Sector = require('../../models/sector');
const School = require('../../models/school');
const Classroom = require('../../models/classroom');

module.exports = {
  // Render a list of all employees
  // GET /employees
  index: async function (req, res) {
    try {
      const employees = await Employee.find({}).populate('currentSector');
      return res.render('admin/employees/index', { employees });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar lista de funcionários.' });
    }
  },

  // Save a new employee to the database
  // POST /employees
  save: async function (req, res) {
    const {
      name, enrollment, position, role, bond, birthday,
      cpf, rg, ctps, electorTitle, pis, address, phone,
      email, situation, admissionDate, formation,
      complementaryFormation, workload, fundeb, originSector,
      currentSector, school, classroom, shift, info
    } = req.body.employee;

    const employee = new Employee({
      name, enrollment, position, role, bond, birthday: dayjs(birthday),
      cpf, rg, ctps, electorTitle, pis, address, phone,
      email, situation, admissionDate, formation,
      complementaryFormation, workload, fundeb, originSector,
      currentSector, school, classroom, shift, info
    });
  
    try {
      await employee.save();
      req.flash('success', 'Funcionário salvo com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      const allSectors = await Sector.find({});
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');

      return res.render('admin/employees/new', {
        employee,
        allSectors,
        allSchools,
        allClasses,
        dayjs,
        error: 'Erro ao salvar funcionário.'
      });
    }
  },

  // Render the new employee form
  // GET /admin/employees/new
  new: async function (req, res) {
    const employee = new Employee();
    
    try {
      const allSectors = await Sector.find({});
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');

      return res.render('admin/employees/new', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render a single employee
  // GET /admin/employees/:id
  show: async function (req, res) {
    const { id } = req.params;
  
    try {
      const employee = await Employee.findById(id).populate([
        'originSector',
        'currentSector',
        'school',
        'classroom'
      ]);
      res.render('admin/employees/show', { employee, dayjs });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render employee edit form
  // GET /admin/employees/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    const allSectors = await Sector.find({});
    const allSchools = await School.find({});
    const allClasses = await Classroom.find({}).populate('school');
  
    try {
      const employee = await Employee.findById(id);

      return res.render('admin/employees/edit', { employee, allSectors, allSchools, allClasses, dayjs });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a employee in the database
  // PUT /admin/employees/:id
  update: async function (req, res) {
    const { id } = req.params;
    const {
      name, enrollment, position, role, bond, birthday,
      cpf, rg, ctps, electorTitle, pis, address, phone,
      email, situation, admissionDate, formation,
      complementaryFormation, workload, fundeb, originSector,
      currentSector, school, classroom, shift, info
    } = req.body.employee;
  
    try {
      await Employee.findByIdAndUpdate(id, {
        name, enrollment, position, role, bond, birthday,
        cpf, rg, ctps, electorTitle, pis, address, phone,
        email, situation, admissionDate, formation,
        complementaryFormation, workload, fundeb, originSector,
        currentSector, school, classroom, shift, info
      });
  
      req.flash('success', 'Funcionário atualizado com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      return res.render('admin/employees/edit', {
        employee: {
          name, enrollment, position, role, bond, birthday,
          cpf, rg, ctps, electorTitle, pis, address, phone,
          email, situation, admissionDate, formation,
          complementaryFormation, workload, fundeb, originSector,
          currentSector, school, classroom, shift, info
        },
        error: 'Erro ao salvar funcionário.'
      });
    }
  },

  // Delete employee from database
  // DELETE /admin/employees/:id
  delete: async function (req, res) {
    const { id } = req.params;
  
    try {
      await Employee.findByIdAndRemove(id);
  
      req.flash('success', 'Funcionário excluído com sucesso.');
      return res.redirect('/admin/employees');
    } catch (error) {
      return res.redirect('/admin/employees', { error: 'Erro ao excluir employeee.' });
    }
  }
};
