const dayjs = require('dayjs');
const Classroom = require('../../models/classroom');
const School = require('../../models/school');
const Student = require('../../models/student');
const Transport = require('../../models/transport');
const classroomsService = require('../../services/classrooms-service');
const schoolsService = require('../../services/schools-service');
const studentsService = require('../../services/students-service');
const transportsService = require('../../services/transports-service');

module.exports = {
  // Save a new student to the database
  // POST /students
  save: async function (req, res) {
    const { enrollment, firstName, lastName, gender, phone, address, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body.student;
    const birthday = dayjs(req.body.student.birthday);
    const student = studentsService.create(enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);

    try {
      await studentsService.save(student);

      req.flash('success', 'Estudante salvo com sucesso.');
      return res.redirect(`/manager/classrooms/${classroom}`);
    } catch (error) {
      const currentUser = req.user._id;
      const userSchools = await schoolsService.findByManager(currentUser);
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await classroomsService.findAllInSchools(schoolIds);
      const allTransports = await transportsService.findAll();

      return res.redirect('/manager/students/new', userSchools, allTransports, schoolsClassrooms, { student, error: 'Erro ao salvar estudante.' });
    }
  },

  // Render a single student
  // GET /students/:id
  show: async function (req, res) {
    const { id } = req.params;

    try {
      const student = await studentsService.findById(id, ['school', 'classroom', 'transport']);
      return res.status(200).render('students/show', { student, dayjs });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render student edit form
  // GET /students/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    const currentUser = req.user._id;

    try {
      const userSchools = await schoolsService.findByManager(id);
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await classroomsService.findAllInSchools(schoolIds);
      const allTransports = await transportsService.findAll();
      const student = await studentsService.findById(id);

      return res.status(200).render('students/edit', {
        student,
        userSchools,
        schoolsClassrooms,
        allTransports,
        dayjs
      });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Update a student in the database
  // PUT /students/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { enrollment, firstName, lastName, gender, phone, address, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body.student;
    const birthday = dayjs(req.body.student.birthday);

    try {
      await studentsService.update(id, enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);
      req.flash('success', 'Estudante atualizado com sucesso.');
      return res.redirect(`/manager/classrooms/${classroom}`);
    } catch (error) {
      return res.redirect(`/manager/students/${id}/edit`);
    }
  },

  // Delete student from database
  // DELETE /students/:id
  delete: async function (req, res) {
    const { id } = req.params;
    const student = await studentsService.findById(id);
    const classroom = student.classroom;

    try {
      await studentsService.delete(id);
      req.flash('success', 'Estudante excluído com sucesso.');
      return res.redirect(`/manager/classrooms/${classroom}`);
    } catch (error) {
      return res.redirect(`/manager/classrooms/${classroom}`, { error });
    }
  }
};
