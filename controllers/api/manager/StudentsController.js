class StudentsController {
  constructor (service, schoolService) {
    this.service = service;
    this.schoolService = schoolService;
  }

  // Find all students from the manager's schools
  // GET /api/manager/students
  index = async (req, res) => {
    const manager = req.user.id;

    try {
      const managerSchools = await this.schoolService.findByManager(manager);
      const managerClassrooms = [];

      managerSchools.forEach((school) => {
        const schoolClassrooms = school.classrooms.map((classroom) => classroom.id);
        managerClassrooms.push(...schoolClassrooms);
      });

      const managerStudents = await this.service.findAllInClassrooms(managerClassrooms);
      
      return res.status(200).json(managerStudents);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar estudantes.', error: error.message });
    }
  }

  // Save a new student to the database
  // POST /api/manager/students
  save = async (req, res) => {
    const {
      student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birthPlace,
      fatherName,
      fatherOcupation,
      motherName,
      motherOcupation,
      bloodType,
      info,
      transport_id
    } = req.body;

    const student = this.service.create({student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birthPlace,
      fatherName,
      fatherOcupation,
      motherName,
      motherOcupation,
      bloodType,
      info,
      transport_id
    });
  
    try {
      await this.service.save(student);
  
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar estudante.' });
    }
  }

  // Return a single student
  // GET /api/manager/students/:id
  findOne = async (req, res) => {
    const { id } = req.params;
  
    try {
      const student = await this.service.findById(id, ['school', 'classroom', 'transport']);

      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar aluno.' });
    }
  }

  // Update a student in the database
  // PUT /api/manager/students/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birthPlace,
      fatherName,
      fatherOcupation,
      motherName,
      motherOcupation,
      bloodType,
      info,
      transport_id
    } = req.body;
  
    try {
      const student = await this.service.findById(id);

      if (student_code) student.student_code = student_code;
      if (first_name) student.first_name = first_name;
      if (last_name) student.last_name = last_name;
      if (gender) student.gender = gender;
      if (phone) student.phone = phone;
      if (address) student.address = address;
      if (birthday) student.birthday = birthday;
      if (birthPlace) student.birthPlace = birthPlace;
      if (fatherName) student.fatherName = fatherName;
      if (fatherOcupation) student.fatherOcupation = fatherOcupation;
      if (motherName) student.motherName = motherName;
      if (motherOcupation) student.motherOcupation = motherOcupation;
      if (bloodType) student.bloodType = bloodType;
      if (info) student.info = info;
      if (transport_id) student.transport_id = transport_id;
      student.updated = Date.now();

      await this.service.save(student);
  
      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar aluno.',
        error: error.message
      });
    }
  }

  // Delete student from database
  // DELETE /api/manager/students/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await this.service.delete(id);
  
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao excluir aluno.' });
    }
  }
}

module.exports = StudentsController;
