const ClassroomService = require("../../../services/ClassroomService");

class ClassroomsController {
  // Return a list of all classrooms
  // GET /api/admin/classrooms
  findAll = async (req, res) => {
    try {
      const classrooms = await ClassroomService.findAll();

      return res.json(classrooms);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar turmas',
        error: error.message
      });
    }
  }

  // Save a new classroom to the database
  // POST /api/admin/classrooms
  save = async (req, res) => {
    const { name, grade_id, school_id } = req.body;
    const classroom = ClassroomService.create(name, grade_id, school_id);

    try {
      await ClassroomService.save(classroom);

      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar turma',
        error: error.message
      });
    }
  }

  // Return a single classroom
  // GET /api/admin/classrooms/:id
  findById = async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await ClassroomService.findById(id);
      const students = await classroom.getStudents();

      return res.json({ ...classroom._doc, students });
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar turma',
        error: error.message
      });
    }
  }

  // Update a classroom in the database
  // PUT /admin/classrooms/:id
  update = async (req, res) => {
    const { name, grade_id } = req.body;
    const { id } = req.params;

    try {
      const classroom = await ClassroomService.findById(id);
      
      if (name) {
        classroom.name = name;
      }
      if (grade_id) {
        classroom.grade_id = grade_id;
      }

      await ClassroomService.save(classroom);

      return res.json(classroom);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar turma',
        error: error.message
      });
    }
  }

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await ClassroomService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir turma',
        error: error.message
      });
    }
  }
}

module.exports = ClassroomsController;
