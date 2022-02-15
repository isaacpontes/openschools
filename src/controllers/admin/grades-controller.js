const gradeService = require("../../services/grade-service");

module.exports = {
  // Return a list of all grades
  // GET /api/admin/grades
  index: async (req, res) => {
    try {
      const grades = await gradeService.findAll();

      return res.json(grades);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar anos escolares',
        error: error.message
      });
    }
  },

  // Save a new grade to the database
  // POST /api/admin/grades
  save: async (req, res) => {
    const { name } = req.body;
    const grade = gradeService.create(name);

    try {
      await gradeService.save(grade);

      return res.status(201).json(grade);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar ano escolar',
        error: error.message
      });
    }
  },

  // Update a grade in the database
  // PUT /api/admin/grades/:id
  update: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
      await gradeService.updateOneOne(id, name);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar ano escolar',
        error: error.message
      });
    }
  },

  // Delete grade from database
  // DELETE /api/admin/grades/:id
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await gradeService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir ano escolar',
        error: error.message
      });
    }
  }
}
