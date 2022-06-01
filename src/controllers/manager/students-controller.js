const studentService = require('../../services/student-service');

module.exports = {
  // Find all students from the manager's schools
  // GET /api/manager/students
  index: async (req, res) => {
    try {
      const students = await studentService.findAll();

      return res.status(200).json(students);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao retornar estudantes.', error: error.message });
    }
  },

  // Save a new student to the database
  // POST /api/manager/students
  save: async (req, res) => {
    const {
      student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birth_place,
      father_name,
      father_ocupation,
      mother_name,
      mother_ocupation,
      blood_type,
      info,
      transport_id
    } = req.body;

    const student = studentService.create({student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birth_place,
      father_name,
      father_ocupation,
      mother_name,
      mother_ocupation,
      blood_type,
      info,
      transport_id
    });

    try {
      await studentService.save(student);
  
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar estudante.', error: error.message });
    }
  },

  // Return a single student
  // GET /api/manager/students/:id
  show: async (req, res) => {
    const { id } = req.params;
  
    try {
      const student = await studentService.findById(id, ['school', 'classroom', 'transport']);

      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar aluno.' });
    }
  },

  // Update a student in the database
  // PUT /api/manager/students/:id
  update: async (req, res) => {
    const { id } = req.params;
    const { student_code,
      first_name,
      last_name,
      gender,
      phone,
      address,
      birthday,
      birth_place,
      father_name,
      father_ocupation,
      mother_name,
      mother_ocupation,
      blood_type,
      info,
      transport_id
    } = req.body;
  
    try {
      const student = await studentService.findById(id);

      if (student_code) student.student_code = student_code;
      if (first_name) student.first_name = first_name;
      if (last_name) student.last_name = last_name;
      if (gender) student.gender = gender;
      if (phone) student.phone = phone;
      if (address) student.address = address;
      if (birthday) student.birthday = birthday;
      if (birth_place) student.birth_place = birth_place;
      if (father_name) student.father_name = father_name;
      if (father_ocupation) student.father_ocupation = father_ocupation;
      if (mother_name) student.mother_name = mother_name;
      if (mother_ocupation) student.mother_ocupation = mother_ocupation;
      if (blood_type) student.blood_type = blood_type;
      if (info) student.info = info;
      if (transport_id) student.transport_id = transport_id;
      student.updated = Date.now();

      await studentService.save(student);
  
      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar aluno.',
        error: error.message
      });
    }
  },

  // Delete student from database
  // DELETE /api/manager/students/:id
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await studentService.deleteOne(id);
  
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao excluir aluno.' });
    }
  },

  // Find all students from the manager's schools
  // GET /api/manager/enrolled-students
  enrolledStudents: async (req, res) => {
    const { id } = req.user;

    try {
      const students = await studentService.findAllFromManager(id);

      return res.status(200).json(students);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao retornar estudantes.', error: error.message });
    }
  }
};
