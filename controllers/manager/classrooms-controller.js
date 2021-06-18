const Classroom = require('../../models/classroom');
const Grade = require('../../models/grade');
const School = require('../../models/school');
const Student = require('../../models/student');
const Transport = require('../../models/transport');

module.exports = {
  // Save a new classroom to the database
  // POST /classrooms
  save: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const classroom = new Classroom({ name, grade, school });

    try {
      await classroom.save();
      req.flash('success', 'Turma salva com sucesso.');
      return res.redirect(`/manager/schools/${classroom.school}`);
    } catch (error) {
      console.log(error);
      return res.status(400).render('classrooms/new', { classroom, error: 'Erro ao salvar turma.' });
    }
  },

  // Render a single classroom
  // GET /classrooms/:id
  show: async function (req, res) {
    try {
      const classroom = await Classroom.findById(req.params.id);
      const students = await Student.find({ classroom: classroom._id });

      return res.status(200).render('classrooms/show', { classroom, students });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Render classroom edit form
  // GET /classrooms/:id/edit
  edit: async function (req, res) {
    try {
      const classroom = await Classroom.findById(req.params.id);
      const grades = await Grade.find({});

      return res.status(200).render('classrooms/edit', { classroom, grades });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Update a classroom in the database
  // PUT /classrooms/:id
  update: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const { id } = req.params;

    try {
      await Classroom.findByIdAndUpdate(id, { name, grade });

      req.flash('success', 'Turma atualizada com sucesso.');
      return res.redirect(`/manager/schools/${school}`);
    } catch (error) {
      return res.redirect(`/manager/classrooms/${id}/edit`, { error: 'Erro ao atualizar turma.' });
    }
  },

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete: async function (req, res) {
    const classroom = await Classroom.findById(req.params.id);
    try {
      await classroom.remove();

      req.flash('success', 'Turma excluída com sucesso.');
      return res.redirect(`/manager/schools/${classroom.school}`);
    } catch (error) {
      return res.redirect(`/manager/schools/${classroom.school}`, { error: 'Erro ao excluir turma.' });
    }
  },

  // Render the new student form
  // GET /classrooms/:id/addStudent
  addStudent: async function (req, res) {
    const currentUser = req.user._id;

    try {
      const userSchools = await School.find({ manager: currentUser });
      const schoolIds = userSchools.map((school) => school._id);
      const schoolsClassrooms = await Classroom.find({ school: { $in: schoolIds } }).populate(['grade', 'school']);

      const classroom = await Classroom.findById(req.params.id);
      const allTransports = await Transport.find({});

      const student = new Student();
      student.school = classroom.school;
      student.classroom = classroom._id;

      return res.render('students/new', {
        student,
        userSchools,
        schoolsClassrooms,
        allTransports,
      });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }
};
