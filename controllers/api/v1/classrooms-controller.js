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
  // PATCH /api/v1/classrooms/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { name, code } = req.body;

    try {
      await Classroom.findByIdAndUpdate(id, { name, code });
  
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar turma.' });
    }
  },

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await Classroom.findByIdAndRemove(id);

      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao excluir turma.' });
    }
  },
};
