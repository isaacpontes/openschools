const Controller = require("../Controller");
const GradeService = require("../../services/GradeService");
const StudentService = require("../../services/StudentService");
const TransportService = require("../../services/TransportService");

class ClassroomsController extends Controller {
  // Render a list of all user's classrooms
  // GET /manager/classrooms
  index = async (req, res) => {
    const currentUser = req.user.id;

    try {
      const classrooms = await this.service.findByUserId(currentUser);

      return res.render('manager/classrooms/index', { classrooms });
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
      return res.redirect(`/manager/schools/${classroom.school_id}`);
    } catch (error) {
      return res.redirect(`/manager/schools/${school_id}/add-classroom`);
    }
  }

  // Render a single classroom
  // GET /classrooms/:id
  show = async (req, res) => {
    const { id } = req.params;

    const studentService = new StudentService();

    try {
      const classroom = await this.service.findById(id);
      const students = await classroom.getStudents();

      return res.status(200).render('manager/classrooms/show', { classroom, students });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Render classroom edit form
  // GET /classrooms/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    const gradeService = new GradeService();

    try {
      const classroom = await this.service.findById(id);
      const grades = await gradeService.findAll();

      return res.status(200).render('manager/classrooms/edit', { classroom, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Update a classroom in the database
  // PUT /classrooms/:id
  update = async (req, res) => {
    const { name, grade_id, school_id } = req.body.classroom;
    const { id } = req.params;

    try {
      await this.service.update(id, name, grade_id);
      req.flash('success', 'Turma atualizada com sucesso.');
      return res.redirect(`/manager/schools/${school_id}`);
    } catch (error) {
      req.flash('error', 'Erro ao atualizar turma.');
      return res.redirect(`/manager/classrooms/${id}/edit`);
    }
  }

  // Delete classroom from database
  // DELETE /manager/classrooms/:id
  delete = async (req, res) => {
    const { id } = req.params;
    const classroom = await this.service.findById(id);

    try {
      await this.service.delete(id);
      req.flash('success', 'Turma excluída com sucesso.');
      return res.redirect(`/manager/schools/${classroom.school_id}`);
    } catch (error) {
      req.flash('error', 'Erro ao excluir turma.')
      return res.redirect(`/manager/classrooms/${classroom.id}`);
    }
  }

  // Render the new student form
  // GET /classrooms/:id/addStudent
  addStudent = async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id);

      const transportService = new TransportService();
      const allTransports = await transportService.findAll();

      return res.render('manager/classrooms/add-student', {
        classroom,
        allTransports,
      });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
}

module.exports = ClassroomsController;
