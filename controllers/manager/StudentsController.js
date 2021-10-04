const Controller = require('../Controller');
const dayjs = require('dayjs');
const TransportService = require('../../services/TransportService');
const AcademicYearsService = require('../../services/AcademicYearService');
const SchoolService = require('../../services/SchoolService');
const EnrollmentService = require('../../services/EnrollmentService');

class StudentsController extends Controller {
  // Render a list of all students
  // GET /manager/students
  index = async (req, res) => {
    try {
      const students = await this.service.findAllWithAcademicYears();

      return res.render('manager/students/index', { students });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new student to the database
  // POST /manager/students
  save = async (req, res) => {
    const {
      student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birth_place,
      father_name,
      father_ocupation,
      mother_name,
      mother_ocupation,
      blood_type,
      info,
      transport_id
    } = req.body.student;

    const student = this.service.create({
      student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birth_place,
      father_name,
      father_ocupation,
      mother_name,
      mother_ocupation,
      blood_type,
      info,
      transport_id,
    });

    try {
      await this.service.save(student);

      req.flash('success', 'Estudante salvo com sucesso.');
      return res.redirect(`/manager/students/${student.id}`);
    } catch (error) {
      return res.redirect('/manager/students/create');
    }
  }

  // Render create student form
  // GET /manager/students/create
  create = async (req, res) => {
    const student = this.service.create({});

    try {
      const transportService = new TransportService();
      const allTransports = await transportService.findAll();

      return res.render('manager/students/create', { student, allTransports, dayjs });
    } catch (error) {
      return res.satus(400).render('pages/error', { error });
    }
  }

  // Render a single student
  // GET /manager/students/:id
  show = async (req, res) => {
    const { id } = req.params;

    try {
      const student = await this.service.findById(id, ['school', 'classroom', 'transport']);
      return res.render('manager/students/show', { student, dayjs });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Render the enroll student form
  // GET /manager/students/:id/enroll
  enrollForm = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const academicYearsService = new AcademicYearsService();
    const schoolService = new SchoolService();

    try {
      const student = await this.service.findById(id);
      const academicYears = await academicYearsService.findAll();
      const schools = await schoolService.findByManagerWithClassrooms(userId);

      return res.status(200).render('manager/students/enroll', { student, academicYears, schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Enroll a student in a given academic year and classroom
  // POST /manager/students/:id/enroll
  enroll = async (req, res) => {
    const { id } = req.params;
    const { academic_year_id, classroom_id } = req.body;

    const enrollmentService = new EnrollmentService();
    const enrollment = enrollmentService.create(id, classroom_id, academic_year_id);

    try {
      await enrollmentService.save(enrollment);

      req.flash('success', 'Estudante matriculado com sucesso.');
      return res.redirect('/manager/students');
    } catch (error) {
      req.flash('error', 'Erro ao matricular estudante.');
      return res.redirect(`/manager/students/${id}/enroll`);
    }
  }

  // // Render student edit form
  // // GET /manager/students/:id/edit
  // edit = async (req, res) => {
  //   const { id } = req.params;

  //   try {
  //     const transportService = new TransportService();
  //     const allTransports = await transportService.findAll();

  //     const student = await this.service.findById(id);

  //     return res.status(200).render('manager/students/edit', {
  //       student,
  //       allTransports,
  //       dayjs
  //     });
  //   } catch (error) {
  //     return res.status(400).render('pages/error', { error });
  //   }
  // }

  // // Update a student in the database
  // // PUT /manager/students/:id
  // update = async (req, res) => {
  //   const { id } = req.params;
  //   const { student_code,
  //     first_name,
  //     last_name,
  //     gender,
  //     phone,
  //     address,
  //     birthday,
  //     birth_place,
  //     father_name,
  //     father_ocupation,
  //     mother_name,
  //     mother_ocupation,
  //     blood_type,
  //     info,
  //     transport_id
  //   } = req.body.student;

  //   try {
  //     const student = await this.service.findById(id);

  //     if (student_code) student.student_code = student_code;
  //     if (first_name) student.first_name = first_name;
  //     if (last_name) student.last_name = last_name;
  //     if (gender) student.gender = gender;
  //     if (phone) student.phone = phone;
  //     if (address) student.address = address;
  //     if (birthday) student.birthday = birthday;
  //     if (birth_place) student.birth_place = birth_place;
  //     if (father_name) student.father_name = father_name;
  //     if (father_ocupation) student.father_ocupation = father_ocupation;
  //     if (mother_name) student.mother_name = mother_name;
  //     if (mother_ocupation) student.mother_ocupation = mother_ocupation;
  //     if (blood_type) student.blood_type = blood_type;
  //     if (info) student.info = info;
  //     if (transport_id) student.transport_id = transport_id;

  //     await this.service.save(student);

  //     req.flash('success', 'Estudante atualizado com sucesso.');
  //     return res.redirect(`/manager/classrooms/${classroom}`);
  //   } catch (error) {
  //     return res.redirect(`/manager/students/${id}/edit`);
  //   }
  // }
}

module.exports = StudentsController;
