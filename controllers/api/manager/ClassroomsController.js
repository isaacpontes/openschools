class ClassroomsController {
  constructor (service, studentsService) {
    this.service = service;
    this.studentsService = studentsService;
  }

  // Save a new classroom to the database
  // POST /api/manager/classrooms
  save = async (req, res) => {
    const { name, grade_id, school_id } = req.body;
    const classroom = this.service.create(name, grade_id, school_id);
  
    try {
      await this.service.save(classroom);
      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar turma.', error });
    }
  }

  // Return a single classroom
  // GET /api/manager/classrooms/:id
  findOne = async (req, res) => {
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id);
      return res.status(200).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar turma.' })
    }
  }

  // Update a classroom in the database
  // PATCH /api/manager/classrooms/:id
  update = async (req, res) => {
    const { name, grade_id } = req.body;
    const { id } = req.params;

    try {
      const classroom = await this.service.findById(id);
      
      if (name) classroom.name = name;
      if (grade_id) classroom.grade_id = grade_id;

      await this.service.save(classroom);

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
      await this.service.delete(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao excluir turma',
        error: error.message
      });
    }
  }

  // Return all the classroom's students
  // GET /api/manager/classrooms/:id/students
  findClassroomStudents = async (req, res) => {
    const { id } = req.params;

    try {
      const students = await this.studentsService.findByClassroomId(id);
      
      return res.status(200).json(students);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar turmas.'})
    }
  }
}

module.exports = ClassroomsController;
