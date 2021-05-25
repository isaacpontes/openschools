const Classroom = require('../models/classroom');
const School = require('../models/school');
const Student = require('../models/student');
const Transport = require('../models/transport');

module.exports = {
  // Save a new classroom to the database
  // POST /classrooms
  save: async function (req, res) {
    const { name, code, school } = req.body.classroom;
    const classroom = new Classroom({ name, code, school });
  
    try {
      await classroom.save();
      req.flash('success', 'Turma salva com sucesso.');
      res.redirect(`/schools/${classroom.school}`);
    } catch (error) {
      res.render('classrooms/new', { classroom, error: 'Erro ao salvar turma.' });
    }
  },

  // Render a single classroom
  // GET /classrooms/:id
  show: async function (req, res) {
    try {
      const classroom = await Classroom.findById(req.params.id);
      const students = await Student.find({ classroom: classroom._id });

      res.status(200).render('classrooms/show', { classroom, students });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render classroom edit form
  // GET /classrooms/:id/edit
  edit: async function (req, res) {
    try {
      const classroom = await Classroom.findById(req.params.id);
      res.render('classrooms/edit', { classroom });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a classroom in the database
  // PUT /classrooms/:id
  update: async function (req, res) {
    const { name, code, school } = req.body.classroom;

    try {
      await Classroom.findByIdAndUpdate(req.params.id, { name, code });
  
      req.flash('success', 'Turma atualizada com sucesso.');
      res.redirect(`/schools/${school}/classrooms`);
    } catch (error) {
      res.render('classrooms/edit', { classroom: { name, code, school }, error: 'Erro ao atualizar turma.' });
    }
  },

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete: async function (req, res) {
    const classroom = await Classroom.findById(req.params.id);
    try {
      await classroom.remove();

      req.flash('success', 'Turma excluída com sucesso.');
      res.redirect(`/schools/${classroom.school}`);
    } catch (error) {
      res.redirect(`/schools/${classroom.school}`, { error: 'Erro ao excluir turma.' });
    }
  },

  // Render the new student form
  // GET /classrooms/:id/addStudent
  addStudent: async function (req, res) {
    const currentUser = req.user._id;

    try {
      const userSchools = await School.find({ manager: currentUser });
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await Classroom.find({ school: { $in: schoolIds } }).populate('school');
      
      const classroom = await Classroom.findById(req.params.id);
      const allTransports = await Transport.find({});

      const student = new Student();
      student.school = classroom.school;
      student.classroom = classroom._id;

      res.render('students/new', {
        student,
        userSchools,
        schoolsClassrooms,
        allTransports,
      });
    } catch (error) {
      res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  }
};
