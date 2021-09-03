const Controller = require("../Controller");
const gradesService = require("../../services/grades-service");
const studentsService = require("../../services/students-service");
const TransportsService = require("../../services/TransportsService");

class ClassroomsController extends Controller {
  // Render a list of all user's classrooms
  // GET /manager/classrooms
  index = async (req, res) => {
    const currentUser = req.user._id;

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
    const { name, grade, school } = req.body.classroom;
    const classroom = this.service.create(name, grade, school);

    try {
      await this.service.save(classroom);
      req.flash('success', 'Turma salva com sucesso.');
      return res.redirect(`/manager/schools/${classroom.school}`);
    } catch (error) {
      return res.status(400).render('manager/classrooms/new', { classroom, error: 'Erro ao salvar turma.' });
    }
  }

  // Render a single classroom
  // GET /classrooms/:id
  show = async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id, { path: 'grade' });
      const students = await studentsService.findByClassroomId(id)

      return res.status(200).render('manager/classrooms/show', { classroom, students });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Render classroom edit form
  // GET /classrooms/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id);
      const grades = await gradesService.findAll();

      return res.status(200).render('manager/classrooms/edit', { classroom, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Update a classroom in the database
  // PUT /classrooms/:id
  update = async (req, res) => {
    const { name, grade, school } = req.body.classroom;
    const { id } = req.params;

    try {
      await this.service.update(id, name, grade);
      req.flash('success', 'Turma atualizada com sucesso.');
      return res.redirect(`/manager/schools/${school}`);
    } catch (error) {
      return res.redirect(`/manager/classrooms/${id}/edit`, { error: 'Erro ao atualizar turma.' });
    }
  }

  // Delete classroom from database
  // DELETE /manager/classrooms/:id
  delete = async (req, res) => {
    const { id } = req.params;
    const classroom = await this.service.findById(id);
    const schoolId = classroom.school;

    try {
      await this.service.delete(id);
      req.flash('success', 'Turma excluída com sucesso.');
      return res.redirect(`/manager/schools/${schoolId}`);
    } catch (error) {
      return res.redirect(`/manager/schools/${schoolId}`, { error: 'Erro ao excluir turma.' });
    }
  }

  // Render the new student form
  // GET /classrooms/:id/addStudent
  addStudent = async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id);

      const transportsService = new TransportsService();
      const allTransports = await transportsService.findAll();

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
