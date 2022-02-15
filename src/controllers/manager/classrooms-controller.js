const classroomService = require("../../services/classroom-service");

module.exports = {
  // Return a list of all classrooms belonging to the manager's school
  // GET /api/manager/classrooms
  index: async (req, res) => {
    const { id } = req.user;

    try {
      const classrooms = await classroomService.findByUserId(id);

      return res.json(classrooms);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar turmas',
        error: error.message
      });
    }
  },

  // Save a new classroom to the database
  // POST /api/manager/classrooms
  save: async (req, res) => {
    const { name, grade_id, school_id } = req.body;
    const classroom = classroomService.create(name, grade_id, school_id);
  
    try {
      await classroomService.save(classroom);
      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar turma.', error });
    }
  },

  // Return a single classroom
  // GET /api/manager/classrooms/:id
  show: async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await classroomService.findById(id);
      return res.status(200).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar turma.' })
    }
  },

  // Update a classroom in the database
  // PATCH /api/manager/classrooms/:id
  update: async (req, res) => {
    const { name, grade_id } = req.body;
    const { id } = req.params;

    try {
      const classroom = await classroomService.findById(id);
      
      if (name) classroom.name = name;
      if (grade_id) classroom.grade_id = grade_id;

      await classroomService.save(classroom);

      return res.json(classroom);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar turma',
        error: error.message
      });
    }
  },

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await classroomService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir turma',
        error: error.message
      });
    }
  }
}
