const classroomsService = require('../../services/classrooms-service');
const gradesService = require('../../services/grades-service');
const schoolsService = require('../../services/schools-service');
const studentsService = require('../../services/students-service');
const transportsService = require('../../services/transports-service');

module.exports = {
  // Save a new classroom to the database
  // POST /classrooms
  save: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const classroom = classroomsService.create(name, grade, school);

    try {
      await classroomsService.save(classroom);
      req.flash('success', 'Turma salva com sucesso.');
      return res.redirect(`/manager/schools/${classroom.school}`);
    } catch (error) {
      console.log(error);
      return res.status(400).render('classrooms/new', { classroom, error: 'Erro ao salvar turma.' });
    }
  },

  // Render a single classroom
  // GET /classrooms/:id
  show: async function (req, res) {
    const { id } = req.params;

    try {
      const classroom = await classroomsService.findById(id, { path: 'grade' });
      const students = await studentsService.findByClassroomId(id)

      return res.status(200).render('classrooms/show', { classroom, students });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render classroom edit form
  // GET /classrooms/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;

    try {
      const classroom = await classroomsService.findById(id);
      const grades = await gradesService.findAll();

      return res.status(200).render('classrooms/edit', { classroom, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Update a classroom in the database
  // PUT /classrooms/:id
  update: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const { id } = req.params;

    try {
      await classroomsService.update(id, name, grade);
      req.flash('success', 'Turma atualizada com sucesso.');
      return res.redirect(`/manager/schools/${school}`);
    } catch (error) {
      return res.redirect(`/manager/classrooms/${id}/edit`, { error: 'Erro ao atualizar turma.' });
    }
  },

  // Delete classroom from database
  // DELETE /manager/classrooms/:id
  delete: async function (req, res) {
    const { id } = req.params;
    const classroom = await classroomsService.findById(id);
    console.log(classroom);
    const schoolId = classroom.school;

    try {
      await classroomsService.delete(id);
      req.flash('success', 'Turma excluída com sucesso.');
      return res.redirect(`/manager/schools/${schoolId}`);
    } catch (error) {
      return res.redirect(`/manager/schools/${schoolId}`, { error: 'Erro ao excluir turma.' });
    }
  },

  // Render the new student form
  // GET /classrooms/:id/addStudent
  addStudent: async function (req, res) {
    const { id } = req.params;
    const currentUser = req.user._id;

    try {
      const userSchools = await schoolsService.findByManager(currentUser);
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await classroomsService.findAllInSchools(schoolIds);

      const classroom = await classroomsService.findById(id);
      const allTransports = await transportsService.findAll();

      const student = studentsService.create();
      student.school = classroom.school;
      student.classroom = classroom._id;

      return res.render('students/new', {
        student,
        userSchools,
        schoolsClassrooms,
        allTransports,
      });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
};
