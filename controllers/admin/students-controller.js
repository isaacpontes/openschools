const dayjs = require('dayjs');
const Classroom = require('../../models/classroom');
const School = require('../../models/school');
const Student = require('../../models/student');
const Transport = require('../../models/transport');

module.exports = {
  // Render a list of all students
  // GET /admin/students
  index: async function (req, res) {
    try {
      const students = await Student.find({}).populate(['school', 'classroom']);
      return res.status(200).render('admin/students/index', { students });
    } catch (error) {
      return res.status(400).render('pages/error', { error: 'Erro ao carregar lista de funcionários.' });
    }
  },

  // Save a new student to the database
  // POST /admin/students
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
      res.status(204).redirect('/admin/students');
  
    } catch (error) {
  
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');
      const allTransports = await Transport.find({});
  
      console.log(error);
      res.status(400).render('/admin/students/new', {
        student,
        allSchools,
        allClasses,
        allTransports,
        error: 'Erro ao salvar estudante.'
      });
    }
  },

  // Render new student form
  // GET /admin/students/new
  new: async function (req, res) {
    const student = new Student();
  
    try {
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');
      const allTransports = await Transport.find({});

      res.status(200).render('admin/students/new', {
        student,
        allSchools,
        allClasses,
        allTransports,
        dayjs
      });
    } catch (error) {
      res.satus(400).render('pages/error', { error, message: 'Erro ao carregar página.' });
    }
  },

  // Render a single student
  // GET /admin/students/:id
  show: async function (req, res) {
    const id = req.params.id;
  
    try {
      const student = await Student.findById(id).populate(['school', 'classroom', 'transport']);
      
      res.status(200).render('admin/students/show', { student, dayjs });
    } catch (error) {
      res.status(400).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render student edit form
  // GET /admin/students/:id/edit
  edit: async function (req, res) {
    const id = req.params.id;
    const currentUser = req.user._id;
  
    try {
      const allSchools = await School.find({});
      const allClasses = await Classroom.find({}).populate('school');
      const allTransports = await Transport.find({});
      const student = await Student.findById(id);
  
      res.status(200).render('admin/students/edit', {
        student,
        allSchools,
        allClasses,
        allTransports,
        dayjs
      });
    } catch (error) {
      res.status(400).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a student in the database
  // PUT /admin/students/:id
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
      res.status(200).redirect('/admin/students');
      
    } catch (error) {
  
      res.render('admin/students/edit',{ student: {
        enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace,
        fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
        transport, school, classroom
      }, error: 'Erro ao salvar estudante.' });
    }
  },

  // Delete student from database
  // DELETE /admin/students/:id
  delete: async function (req, res) {
    const student = await Student.findById(req.params.id);
  
    try {
      await student.remove();
  
      req.flash('success', 'Estudante excluído com sucesso.');
      res.status(200).redirect('/admin/students');
    } catch (error) {
      res.status(400).render('/admin/students', { error: 'Erro ao excluir estudante.' });
    }
  }
};
