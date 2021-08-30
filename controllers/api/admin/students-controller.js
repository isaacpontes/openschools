const dayjs = require('dayjs');
const studentsService = require('../../../services/students-service');

module.exports = {
  // Return a list of all students
  // GET /api/admin/students
  findAll: async function (req, res) {
    try {
      const students = await studentsService.findAll();
      return res.json(students);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar estudantes',
        error: error.message
      });
    }
  },

  // Save a new student to the database
  // POST /api/admin/students
  save: async function (req, res) {
    const { enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom } = req.body;
    const student = studentsService.create(enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom);

    try {
      await studentsService.save(student);

      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar estudante',
        error: error.message
      });
    }
  },

  // Render a single student
  // GET /api/admin/students/:id
  findById: async function (req, res) {
    const { id } = req.params;

    try {
      const student = await studentsService.findById(id);
      return res.json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar estudante',
        error: error.message
      });
    }
  },

  // Update a student in the database
  // PUT /api/admin/students/:id
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
      if (classroom) student.classroom = classroom;

      await studentsService.save(student);

      return res.json(student)
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar estudante',
        error: error.message
      });
    }
  },

  // Delete student from database
  // DELETE /api/admin/students/:id
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      await studentsService.delete(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escolas',
        error: error.message
      });
    }
  },
};
