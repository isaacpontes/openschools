const Controller = require('../Controller');
const ClassroomsService = require('../../services/ClassroomsService');
const SchoolsService = require('../../services/SchoolsService');
const TransportsService = require('../../services/TransportsService');
const dayjs = require('dayjs');

class StudentsController extends Controller {
  // Save a new student to the database
  // POST /students
  save = async (req, res) => {
    const { enrollment, firstName, lastName, gender, phone, address, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body.student;
    const birthday = dayjs(req.body.student.birthday);
    const student = this.service.create(enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);

    try {
      await this.service.save(student);

      req.flash('success', 'Estudante salvo com sucesso.');
      return res.redirect(`/manager/classrooms/${classroom}`);
    } catch (error) {
      return res.redirect('/manager/students/new');
    }
  }

  // Render a single student
  // GET /students/:id
  show = async (req, res) => {
    const { id } = req.params;

    try {
      const student = await this.service.findById(id, ['school', 'classroom', 'transport']);
      return res.render('manager/students/show', { student, dayjs });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Render student edit form
  // GET /students/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;
    const currentUser = req.user._id;

    const classroomsService = new ClassroomsService();
    const schoolsService = new SchoolsService();

    try {
      const userSchools = await schoolsService.findByManager(currentUser);
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await classroomsService.findAllInSchools(schoolIds);

      const transportsService = new TransportsService();
      const allTransports = await transportsService.findAll();

      const student = await this.service.findById(id);

      return res.status(200).render('manager/students/edit', {
        student,
        userSchools,
        schoolsClassrooms,
        allTransports,
        dayjs
      });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Update a student in the database
  // PUT /students/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { enrollment, firstName, lastName, gender, phone, address, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body.student;
    const birthday = dayjs(req.body.student.birthday);

    try {
      await this.service.update(id, enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);
      req.flash('success', 'Estudante atualizado com sucesso.');
      return res.redirect(`/manager/classrooms/${classroom}`);
    } catch (error) {
      return res.redirect(`/manager/students/${id}/edit`);
    }
  }

  // Delete student from database
  // DELETE /students/:id
  delete = async (req, res) => {
    const { id } = req.params;
    const student = await this.service.findById(id);
    const classroom = student.classroom;

    try {
      await this.service.delete(id);
      req.flash('success', 'Estudante excluído com sucesso.');
      return res.redirect(`/manager/classrooms/${classroom}`);
    } catch (error) {
      return res.redirect(`/manager/classrooms/${classroom}`, { error });
    }
  }
}

module.exports = StudentsController;
