const AcademicYearService = require("../../../services/AcademicYearService");

class AcademicYearsController {
  // Return a list of all academic years
  // GET /api/admin/academic-years
  index = async (req, res) => {
    try {
      const academicYears = await AcademicYearService.findAll();

      return res.json(academicYears);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar anos escolares',
        error: error.message
      });
    }
  }

  // Save a new academic year to the database
  // POST /api/admin/academic-years
  save = async (req, res) => {
    const { year } = req.body;
    const academicYear = AcademicYearService.create(year);

    try {
      await AcademicYearService.save(academicYear);

      return res.status(201).json(academicYear);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar ano escolar',
        error: error.message
      });
    }
  }

  // Update a academic year in the database
  // PUT /api/admin/academic-years/:id
  update = async (req, res) => {
    const id = req.params.id;
    const { year } = req.body;

    try {
      await AcademicYearService.updateOneOne(id, year);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar ano escolar',
        error: error.message
      });
    }
  }

  // Delete academic year from database
  // DELETE /api/admin/academic-years/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await AcademicYearService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir ano escolar',
        error: error.message
      });
    }
  }
}

module.exports = AcademicYearsController;
