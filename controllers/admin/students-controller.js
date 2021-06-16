const dayjs = require('dayjs');
const fs = require('fs');
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

    const marginLeft = 0 + 40;
    const marginRight = pdf.page.width - 40;

    const students = await studentsService.findAll({ path: 'school' });
    const enrollmentX = 60;
    const nameX = 140;
    const phoneX = 320;
    const schoolX = 422;

    pdf.pipe(res);

    pdf.fontSize(14)
      .moveDown(2)
      .text('Listagem de Alunos', 60);
    pdf.moveTo(marginLeft, 128).lineTo(marginRight, 128).stroke();
    pdf.fontSize(11)
      .font('Helvetica-Bold')
      .text('Matrícula', enrollmentX, 140, { lineBreak: false, bold: true })
      .text('Nome Completo', nameX, 140, { lineBreak: false })
      .text('Telefone', phoneX, 140, { lineBreak: false })
      .text('Escola', schoolX, 140, { lineBreak: false })
      .font('Helvetica')
      .moveTo(marginLeft, 160).lineTo(marginRight, 160).stroke()
    ;

    let rowY = 170;

    pdf.on('pageAdded', () => {
      pdf.fontSize(14)
        .moveDown(2)
        .text('Listagem de Alunos', 60);
      pdf.moveTo(marginLeft, 128).lineTo(marginRight, 128).stroke();
      pdf.fontSize(11)
        .font('Helvetica-Bold')
        .text('Matrícula', enrollmentX, 140, { lineBreak: false })
        .text('Nome Completo', nameX, 140, { lineBreak: false })
        .text('Telefone', phoneX, 140, { lineBreak: false })
        .text('Escola', schoolX, 140, { lineBreak: false })
        .font('Helvetica')
        .moveTo(marginLeft, 160).lineTo(marginRight, 160).stroke()
      ;
      rowY = 170;
    });

    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      // const enrollmentHeight = pdf.heightOfString(student.enrollment, { width: 80 });
      // const nameHeight = pdf.heightOfString(`${student.firstName} ${student.lastName}`, { width: 180 });
      // const phoneHeight = pdf.heightOfString(student.phone, { width: 102 });
      // const schoolHeight = pdf.heightOfString(student.school.name, { width: 150 });

      pdf.text(student.enrollment, enrollmentX, rowY, {
          width: 80, height: 12
        })
        .text(`${student.firstName} ${student.lastName}`, nameX, rowY, {
          width: 180, height: 12
        })
        .text(student.phone, phoneX, rowY, {
          width: 102, height: 12
        })
        .text(student.school.name, schoolX, rowY, {
          width: 150, height: 12
        })
      ;

      // rowY += Math.max(enrollmentHeight, nameHeight, phoneHeight, schoolHeight) + 10;
      rowY += 22;

      if (rowY >= pdf.page.height - 82) {
        pdf.addPage();
      }
    }
    const range = pdf.bufferedPageRange();

    for (let i = range.start; i <= (pdf._pageBufferStart + pdf._pageBuffer.length - 1); i++) {
      pdf.switchToPage(i);
      pdf.image('public/images/logo-300x300.png', (pdf.page.width - 48) / 2, 24, { fit: [48, 48] });
      pdf.text('Prefeitura Municipal de São Fidélis', 0, 80, { align: 'center', width: pdf.page.width });
      pdf.fontSize(8)
        .text(`Página ${i + 1} | Gerado em ${dayjs(Date.now()).format('DD/MM/YYYY')}`, 90, pdf.page.height - 40, { lineBreak: false })
        .fontSize(11)
      ;
    }

    pdf.end();

    return;
  }
};
