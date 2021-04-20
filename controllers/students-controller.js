const dayjs = require('dayjs');
const Classroom = require('../models/classroom');
const School = require('../models/school');
const Student = require('../models/student');
const Transport = require('../models/transport');

module.exports = {
  // Save a new student to the database
  // POST /students
  save: async function (req, res) {
    const {
      enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace,
      fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
      transport, school, classroom
    } = req.body.student;
    const student = new Student({
      enrollment, firstName, lastName, gender, phone, address, birthday: dayjs(birthday),
      birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
      transport, school, classroom
    });
  
    try {
      await student.save();
  
      req.flash('success', 'Estudante salvo com sucesso.');
      res.redirect(`/classrooms/${classroom}`);
  
    } catch (error) {
  
      const currentUser = req.user._id;
      const userSchools = await School.find({ manager: currentUser });
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await Classroom.find({ school: { $in: schoolIds } }).populate('school');
      const allTransports = await Transport.find({});
  
      console.log(error);
      res.status(500).render('students/new', userSchools, allTransports, schoolsClassrooms, { student, error: 'Erro ao salvar estudante.' });
    }
  },

  // Render a single student
  // GET /students/:id
  show: async function (req, res) {
    const id = req.params.id;
  
    try {
      const student = await Student.findById(id).populate(['school', 'classroom', 'transport']);
      res.render('students/show', { student, dayjs });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render student edit form
  // GET /students/:id/edit
  edit: async function (req, res) {
    const id = req.params.id;
    const currentUser = req.user._id;
  
    try {
      const userSchools = await School.find({ manager: currentUser });
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await Classroom.find({ school: { $in: schoolIds } }).populate('school');
      const allTransports = await Transport.find({});
      const student = await Student.findById(id);
  
      res.render('students/edit', {
        student,
        userSchools,
        schoolsClassrooms,
        allTransports,
        dayjs
      });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a student in the database
  // PUT /students/:id
  update: async function (req, res) {
    const id = req.params.id;
    const {
      enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace,
      fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
      transport, school, classroom
    } = req.body.student;
  
    try {
      await Student.findByIdAndUpdate(id, {
        enrollment, firstName, lastName, gender, phone, address, birthday: dayjs(birthday),
        birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
        transport, school, classroom, updated: Date.now()
      });
  
      req.flash('success', 'Estudante atualizado com sucesso.');
      res.redirect(`/classrooms/${classroom}`);
      
    } catch (error) {
  
      res.render('students/edit', { student: {
        enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace,
        fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
        transport, school, classroom
      }, error: 'Erro ao salvar estudante.' });
    }
  },

  // Delete student from database
  // DELETE /students/:id
  delete: async function (req, res) {
    const student = await Student.findById(req.params.id);
  
    try {
      await student.remove();
  
      req.flash('success', 'Estudante excluído com sucesso.');
      res.redirect(`/classrooms/${student.classroom}`);
    } catch (error) {
      res.render(`/classrooms/${student.classroom}`, { error: 'Erro ao excluir estudante.' });
    }
  }
};
