class ClassroomsController {
  constructor (service, studentsService) {
    this.service = service;
    this.studentsService = studentsService;
  }

  // Save a new classroom to the database
  // POST /api/manager/classrooms
  save = async (req, res) => {
    const { name, grade, school } = req.body;
    const classroom = this.service.create(name, grade, school);
  
    try {
      await this.service.save(classroom);
      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar turma.', error });
    }
  }

  // Return a single classroom
  // GET /api/v1/classrooms/:id
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
  // PATCH /api/v1/classrooms/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, grade } = req.body;

    try {
      if (typeof name === 'undefined' || typeof grade === 'undefined') {
        throw new Error('Nome e Ano Escolar são obrigatórios');
      }

      await this.service.update(id, name, grade);
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar turma.' });
    }
  }

  // Delete classroom from database
  // DELETE /classrooms/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await this.service.delete(id);

      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao excluir turma.' });
    }
  }

  // Return all the classroom's students
  // GET /api/v1/classrooms/:id/students
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
