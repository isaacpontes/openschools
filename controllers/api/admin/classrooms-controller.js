const classroomsService = require('../../../services/classrooms-service');
const gradesService = require('../../../services/grades-service');
const schoolsService = require('../../../services/schools-service');
const studentsService = require('../../../services/students-service');

module.exports = {
  // Return a list of all classrooms
  // GET /api/admin/classrooms
  findAll: async function (req, res) {
    try {
      const classrooms = await classroomsService.findAll(['grade']);

      return res.json(classrooms);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar turmas',
        error: error.message
      });
    }
  },

  // Save a new classroom to the database
  // POST /api/admin/classrooms
  save: async function (req, res) {
    const { name, grade, school } = req.body;
    const classroom = classroomsService.create(name, grade, school);

    try {
      await classroomsService.save(classroom);

      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar turma',
        error: error.message
      });
    }
  },

  // Return a single classroom
  // GET /api/admin/classrooms/:id
  findById: async function (req, res) {
    const { id } = req.params;

    try {
      const classroom = await classroomsService.findById(id, { path: 'grade' });
      const students = await studentsService.findByClassroomId(classroom._id);

      return res.json({ ...classroom._doc, students });
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar turma',
        error: error.message
      });
    }
  },

  // Update a classroom in the database
  // PUT /admin/classrooms/:id
  update: async function (req, res) {
    const { name, grade } = req.body;
    const { id } = req.params;

    try {
      const classroom = await classroomsService.findById(id);
      
      if (name) {
        classroom.name = name;
      }
      if (grade) {
        classroom.grade = grade;
      }

      await classroomsService.save(classroom);

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
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await classroomsService.delete(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir turma',
        error: error.message
      });
    }
  }
};
