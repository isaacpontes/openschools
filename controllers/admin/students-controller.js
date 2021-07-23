const dayjs = require('dayjs');
const PDFDocument = require('pdfkit');
const classroomsService = require('../../services/classrooms-service');
const schoolsService = require('../../services/schools-service');
const studentsService = require('../../services/students-service');
const transportsService = require('../../services/transports-service');

module.exports = {
  // Render a list of all students
  // GET /admin/students
  index: async function (req, res) {
    try {
      const students = await studentsService.findAll(['school', 'classroom']);
      return res.render('admin/students/index', { students });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Save a new student to the database
  // POST /admin/students
  save: async function (req, res) {
    const { enrollment, firstName, lastName, gender, phone, address, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body.student;
    const birthday = dayjs(req.body.student.birthday);
    const student = studentsService.create(enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);
    try {
      await studentsService.save(student);
      req.flash('success', 'Estudante salvo com sucesso.');
      return res.redirect('/admin/students');
    } catch (error) {
      return res.redirect('/admin/students/new');
    }
  },

  // Render new student form
  // GET /admin/students/new
  new: async function (req, res) {
    const student = studentsService.create();
    try {
      const allSchools = await schoolsService.findAll();
      const allClasses = await classroomsService.findAll({ path: 'school' });
      const allTransports = await transportsService.findAll();

      return res.render('admin/students/new', { student, allSchools, allClasses, allTransports, dayjs });
    } catch (error) {
      return res.satus(400).render('pages/error', { error, message: 'Erro ao carregar página.' });
    }
  },

  // Render a single student
  // GET /admin/students/:id
  show: async function (req, res) {
    const { id } = req.params;
    try {
      const student = await studentsService.findById(id, ['school', 'classroom', 'transport']);
      return res.status(200).render('admin/students/show', { student, dayjs });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render student edit form
  // GET /admin/students/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    try {
      const student = await studentsService.findById(id);
      const allSchools = await schoolsService.findAll();
      const allClasses = await classroomsService.findAll({ path: 'school' });
      const allTransports = await transportsService.findAll();
      return res.render('admin/students/edit', { student, allSchools, allClasses, allTransports, dayjs });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Update a student in the database
  // PUT /admin/students/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { enrollment, firstName, lastName, gender, phone, address, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body.student;
    const birthday = dayjs(req.body.student.birthday);
    try {
      await studentsService.update(id, enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);
      req.flash('success', 'Estudante atualizado com sucesso.');
      return res.redirect('/admin/students');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar estudante.');
      return res.redirect(`/admin/students/${id}/edit`);
    }
  },

  // Delete student from database
  // DELETE /admin/students/:id
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      await studentsService.delete(id);
      req.flash('success', 'Estudante excluído com sucesso.');
      return res.redirect('/admin/students');
    } catch (error) {
      return res.redirect('/admin/students');
    }
  },

  // Generate a PDF file listing all students
  // GET /admin/students/export-pdf
  exportPdf: async function (req, res) {
    const pdf = new PDFDocument({ bufferPages: true, size: 'A4' });
    pdf.pipe(res);
    await studentsService.generatePdfList(pdf);
    pdf.end();
    return;
  }
};
