const schoolsService = require('../../../services/schools-service');
const studentsService = require('../../../services/students-service');

module.exports = {
  // Find all students from the manager's schools
  // GET /api/manager/students
  index: async function (req, res) {
    const manager = req.user._id;

    try {
      const managerSchools = await schoolsService.findByManager(manager);
      const managerClassrooms = [];
      managerSchools.forEach((school) => {
        const schoolClassrooms = school.classrooms.map((classroom) => classroom._id);
        managerClassrooms.push(...schoolClassrooms);
      });
      const managerStudents = await studentsService.findAllInClassrooms(managerClassrooms);
      
      return res.status(200).json(managerStudents);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar estudantes.', error: error.message });
    }
  },

  // Save a new student to the database
  // POST /api/manager/students
  save: async function (req, res) {
    const { enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body;
    const student = studentsService.create(enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);
  
    try {
      await studentsService.save(student);
  
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar estudante.' });
    }
  },

  // Return a single student
  // GET /api/manager/students/:id
  findOne: async function (req, res) {
    const { id } = req.params;
  
    try {
      const student = await studentsService.findById(id, ['school', 'classroom', 'transport']);

      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar aluno.' });
    }
  },

  // Update a student in the database
  // PUT /api/manager/students/:id
  update: async function (req, res) {
    const { id } = req.params;
    const { enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body;
  
    try {
      const student = await studentsService.findById(id);

      if (enrollment) student.enrollment = enrollment;
      if (firstName) student.firstName = firstName;
      if (lastName) student.lastName = lastName;
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
      if (transport) student.transport = transport;
      if (school) student.school = school;
      if (school) student.school = school;
      if (classroom) student.classroom = classroom;
      student.updated = Date.now();

      await studentsService.save(student);
  
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
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await studentsService.delete(id);
  
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao excluir aluno.' });
    }
  }
};
