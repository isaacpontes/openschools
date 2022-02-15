const enrollmentService = require("../../services/enrollment-service");

module.exports = {
  // Return a list of all enrollments
  // GET /api/admin/enrollments
  index: async (req, res) => {
    try {
      const enrollments = await enrollmentService.findAll();

      return res.json(enrollments);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar anos escolares',
        error: error.message
      });
    }
  },

  // Save a new enrollment to the database
  // POST /api/admin/enrollments
  save: async (req, res) => {
    const { status, student_id, classroom_id, academic_year_id } = req.body;
    const enrollment = enrollmentService.create(status, student_id, classroom_id, academic_year_id);

    try {
      await enrollmentService.save(enrollment);

      return res.status(201).json(enrollment);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar matrícula',
        error: error.message
      });
    }
  },

  // Update a enrollment in the database
  // PUT /api/admin/enrollments/:id
  update: async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    try {
      await enrollmentService.updateOneOne(id, status);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar matrícula',
        error: error.message
      });
    }
  },

  // Delete enrollment from database
  // DELETE /api/admin/enrollments/:id
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await enrollmentService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir matrícula',
        error: error.message
      });
    }
  }
}
