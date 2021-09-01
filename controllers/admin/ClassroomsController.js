const gradesService = require('../../services/grades-service');
const schoolsService = require('../../services/schools-service');
const studentsService = require('../../services/students-service');

class ClassroomsController {
  constructor (service) {
    this.service = service;
  }

  // Render a list of all classrooms
  // GET /admin/classrooms
  index = async (req, res) => {
    try {
      const classrooms = await this.service.findAll(['grade', 'school']);

      return res.render('admin/classrooms/index', { classrooms });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new classroom to the database
  // POST /classrooms
  save = async (req, res) => {
    const { name, grade, school } = req.body.classroom;
    const classroom = this.service.create(name, grade, school);

    try {
      await this.service.save(classroom);

      req.flash('success', 'Turma salva com sucesso.');
      return res.redirect('/admin/classrooms');
    } catch (error) {
      req.flash('error', 'Erro ao salvar turma.');
      return res.redirect('/admin/classrooms/create');
    }
  }

  // Render the create classroom form
  // GET /admin/classrooms/create
  create = async (req, res) => {
    const classroom = this.service.create();
    try {
      const schools = await schoolsService.findAll();
      const grades = await gradesService.findAll();

      return res.render('admin/classrooms/create', { classroom, schools, grades });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render a single classroom
  // GET /admin/classrooms/:id
  show = async (req, res) => {
    const { id } = req.params;
    try {
      const classroom = await this.service.findById(id, ['grade', 'school']);
      const students = await studentsService.findByClassroomId(classroom._id);

      return res.render('admin/classrooms/show', { classroom, students });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render the edit classroom form
  // GET /admin/classrooms/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;
    try {
      const classroom = await this.service.findById(id);
      const schools = await schoolsService.findAll();
      const grades = await gradesService.findAll();

      return res.render('admin/classrooms/edit', { classroom, schools, grades });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update a classroom in the database
  // PUT /admin/classrooms/:id
  update = async (req, res) => {
    const { name, grade } = req.body.classroom;
    const { id } = req.params;

    try {
      await this.service.update(id, name, grade);

      req.flash('success', 'Turma atualizada com sucesso.');
      return res.redirect('/admin/classrooms');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar turma.');
      return res.redirect(`/admin/classrooms/${id}/edit`);
    }
  }

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await this.service.delete(id);

      req.flash('success', 'Turma excluída com sucesso.');
      return res.redirect('/admin/classrooms');
    } catch (error) {
      req.flash('error', 'Erro ao excluir turma.');
      return res.redirect('/admin/classrooms');
    }
  }
}

module.exports = ClassroomsController;
