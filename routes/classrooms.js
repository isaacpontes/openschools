const express = require('express');
const Classroom = require('../models/classroom');

const router = express.Router({ mergeParams: true });


// Render a list of all classrooms
// GET /schools/:schoolId/classrooms
router.get('/', async (req, res) => {
  const schoolId = req.params.schoolId;

  try {
    const classrooms = await Classroom.find({ school: schoolId });
    res.render('classrooms/index', { classrooms, schoolId });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar lista de turmas.' });
  }
});


// Save a new classroom to the database
// POST /schools/:schoolId/classrooms
router.post('/', async (req, res) => {
  const { name, code, school } = req.body.classroom;
  const classroom = new Classroom({ name, code, school });

  try {
    await classroom.save();
    req.flash('success', 'Turma salva com sucesso.');
    res.redirect(`/schools/${classroom.school}/classrooms`);
  } catch (error) {
    res.render('classrooms/new', { classroom, error: 'Erro ao salvar turma.' });
  }
});


// Render the new classroom form
// GET /schools/:schoolId/classrooms/new
router.get('/new', async (req, res) => {
  try {
    const classroom = new Classroom();
    const schoolId = req.params.schoolId;
    classroom.school = schoolId;
    res.render('classrooms/new', { classroom });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render classroom edit form
// GET /schools/:schoolId/classrooms/:classroomId/edit
router.get('/:classroomId/edit', async (req, res) => {
  const classroomId = req.params.classroomId;

  try {
    const classroom = await Classroom.findById(classroomId);
    res.render('classrooms/edit', { classroom });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Update a classroom in the database
// PUT /schools/:schoolId/classrooms/:classroomId
router.put('/:classroomId', async (req, res) => {
  const classroomId = req.params.classroomId;
  const { name, code, school } = req.body.classroom;

  try {
    await Classroom.findByIdAndUpdate(classroomId, { name, code });

    req.flash('success', 'Turma atualizada com sucesso.');
    res.redirect(`/schools/${school}/classrooms`);
  } catch (error) {
    res.render('classrooms/new', { classroom: { name, code, school }, error: 'Erro ao salvar turma.' });
  }
});


// Delete classroom from database
// DELETE /schools/:schoolId/classrooms/:classroomId
router.delete('/:classroomId', async (req, res) => {
  const schoolId = req.params.schoolId;
  const classroomId = req.params.classroomId;

  try {
    await Classroom.findByIdAndRemove(classroomId);

    req.flash('success', 'Turma excluída com sucesso.');
    res.redirect(`/schools/${schoolId}/classrooms`);
  } catch (error) {
    res.render('classrooms/index', { error: 'Erro ao excluir turma.' });
  }
});

module.exports = router;
