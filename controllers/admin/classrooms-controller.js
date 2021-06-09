const Classroom = require('../../models/classroom');
const Grade = require('../../models/grade');
const School = require('../../models/school');
const Student = require('../../models/student');

module.exports = {
  // Render a list of all classrooms
  // GET /admin/classrooms
  index: async function (req, res) {
    try {
      const classrooms = await Classroom.find({}).populate(['grade', 'school']);
      return res.status(200).render('admin/classrooms/index', { classrooms });
    } catch (error) {
      return res.status(400).render('pages/error', { error: 'Erro ao carregar lista de escolas.' });
    }
  },

  // Save a new classroom to the database
  // POST /classrooms
  save: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const classroom = new Classroom({ name, grade, school });
  
    try {
      await classroom.save();
      req.flash('success', 'Turma salva com sucesso.');
      return res.status(201).redirect('/admin/classrooms');
    } catch (error) {
      const schools = await School.find({});
      return res.status(400).redirect('/admin/classrooms/new', { classroom, schools, error: 'Erro ao salvar turma.' });
    }
  },

  // Render the new classroom form
  // GET /admin/classrooms/new
  new: async function (req, res) {
    const classroom = new Classroom();

    try {
      const schools = await School.find({});
      const grades = await Grade.find({});

      return res.render('admin/classrooms/new', { classroom, schools, grades });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render a single classroom
  // GET /admin/classrooms/:id
  show: async function (req, res) {
    const { id } = req.params;
    try {
      const classroom = await Classroom.findById(id).populate(['grade', 'school']);
      const students = await Student.find({ classroom: classroom._id });

      res.status(200).render('admin/classrooms/show', { classroom, students });
    } catch (error) {
      res.status(400).render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Render the edit classroom form
  // GET /admin/classrooms/:id/edit
  edit: async function (req, res) {
    const { id } = req.params;

    try {
      const classroom = await Classroom.findById(id);
      const schools = await School.find({});
      const grades = await Grade.find({});

      return res.render('admin/classrooms/edit', { classroom, schools, grades });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar página.' });
    }
  },

  // Update a classroom in the database
  // PUT /admin/classrooms/:id
  update: async function (req, res) {
    const { name, grade, school } = req.body.classroom;
    const { id } = req.params;

    try {
      await Classroom.findByIdAndUpdate(id, { name, grade, school });
  
      req.flash('success', 'Turma atualizada com sucesso.');
      return res.status(200).redirect('/admin/classrooms');
    } catch (error) {
      const schools = await School.find({});

      return res.status(400).render('admin/classrooms/edit', {
        classroom: { name, grade, school },
        schools,
        error: 'Erro ao atualizar turma.'
      });
    }
  },

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await Classroom.findByIdAndRemove(id);

      req.flash('success', 'Turma excluída com sucesso.');
      res.status(204).redirect('/admin/classrooms');
    } catch (error) {
      res.status(400).redirect('/admin/classrooms', { error: 'Erro ao excluir turma.' });
    }
  }
};
