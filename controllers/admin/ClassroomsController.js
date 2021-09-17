const Controller = require('../Controller');
const GradesService = require('../../services/GradesService');
const SchoolsService = require('../../services/SchoolsService');
const StudentsService = require('../../services/StudentsService');

class ClassroomsController extends Controller {
  // Render a list of all classrooms
  // GET /admin/classrooms
  index = async (req, res) => {
    try {
      const classrooms = await this.service.findAll();

      return res.render('admin/classrooms/index', { classrooms });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new classroom to the database
  // POST /classrooms
  save = async (req, res) => {
    const { name, grade_id, school_id } = req.body.classroom;
    const classroom = this.service.create(name, grade_id, school_id);

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

    const schoolsService = new SchoolsService();
    const gradesService = new GradesService();

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

    const studentsService = new StudentsService();

    try {
      const classroom = await this.service.findById(id);
      const students = await studentsService.findByClassroomId(classroom.id);

      return res.render('admin/classrooms/show', { classroom, students });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render the edit classroom form
  // GET /admin/classrooms/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    const schoolsService = new SchoolsService();
    const gradesService = new GradesService();

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
    const { name, grade_id } = req.body.classroom;
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id);
      
      if (name) {
        classroom.name = name;
      }
      if (grade_id) {
        classroom.grade_id = grade_id;
      }

      await this.service.save(classroom);

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
