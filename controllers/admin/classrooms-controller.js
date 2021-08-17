const classroomsService = require('../../services/classrooms-service');
const gradesService = require('../../services/grades-service');
const schoolsService = require('../../services/schools-service');
const studentsService = require('../../services/students-service');

module.exports = {
  // Render a list of all classrooms
  // GET /admin/classrooms
  index: async function (req, res) {
    try {
      const classrooms = await classroomsService.findAll(['grade', 'school']);
      return res.render('admin/classrooms/index', { classrooms });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Save a new classroom to the database
  // POST /classrooms
  save: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const classroom = classroomsService.create(name, grade, school);

    try {
      await classroomsService.save(classroom);
      req.flash('success', 'Turma salva com sucesso.');
      return res.redirect('/admin/classrooms');
    } catch (error) {
      req.flash('error', 'Erro ao salvar turma.');
      return res.redirect('/admin/classrooms/new');
    }
  },

  // Render the new classroom form
  // GET /admin/classrooms/new
  new: async function (req, res) {
    const classroom = classroomsService.create();
    try {
      const schools = await schoolsService.findAll();
      const grades = await gradesService.findAll();
      return res.render('admin/classrooms/new', { classroom, schools, grades });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render a single classroom
  // GET /admin/classrooms/:id
  show: async function (req, res) {
    const { id } = req.params;
    try {
      const classroom = await classroomsService.findById(id, ['grade', 'school']);
      const students = await studentsService.findByClassroomId(classroom._id);
      return res.render('admin/classrooms/show', { classroom, students });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },

  // Render the edit classroom form
  // GET /admin/classrooms/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;
    try {
      const classroom = await classroomsService.findById(id);
      const schools = await schoolsService.findAll();
      const grades = await gradesService.findAll();
      return res.render('admin/classrooms/edit', { classroom, schools, grades });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a classroom in the database
  // PUT /admin/classrooms/:id
  update: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const { id } = req.params;

    try {
      await classroomsService.update(id, name, grade);
      req.flash('success', 'Turma atualizada com sucesso.');
      return res.redirect('/admin/classrooms');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar turma.');
      return res.redirect(`/admin/classrooms/${id}/edit`);
    }
  },

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      await classroomsService.delete(id);
      req.flash('success', 'Turma excluída com sucesso.');
      return res.redirect('/admin/classrooms');
    } catch (error) {
      return res.redirect('/admin/classrooms');
    }
  }
};
