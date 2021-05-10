const Classroom = require('../../../models/classroom');
const Student = require('../../../models/student');

module.exports = {
  // Save a new classroom to the database
  // POST /api/v1/classrooms
  save: async function (req, res) {
    const { name, code, school } = req.body;
    const classroom = new Classroom({ name, code, school });
  
    try {
      await classroom.save();
      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar turma.' });
    }
  },

  // Return a single classroom
  // GET /api/v1/classrooms/:id
  findOne: async function (req, res) {
    const { id } = req.params;

    try {
      const classroom = await Classroom.findById(id).populate('school');

      return res.status(200).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar turma.' })
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
};
