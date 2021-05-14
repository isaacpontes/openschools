const Student = require('../../../models/student');

module.exports = {
  // Save a new student to the database
  // POST /api/v1/students
  save: async function (req, res) {
    const {
      enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace,
      fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
      transport, school, classroom
    } = req.body;
    const student = new Student({
      enrollment, firstName, lastName, gender, phone, address, birthday,
      birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
      transport, school, classroom
    });
  
    try {
      await student.save();
  
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao salvar estudante.' });
    }
  },

  // Return a single student
  // GET /students/:id
  findOne: async function (req, res) {
    const { id } = req.params;
  
    try {
      const student = await Student.findById(id).populate(['school', 'classroom', 'transport']);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao retornar aluno.' });
    }
  },

  // Update a student in the database
  // PUT /students/:id
  update: async function (req, res) {
    const { id } = req.params;
    const {
      enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace,
      fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info,
      transport, school, classroom
    } = req.body;
  
    try {
      const student = await Student.findById(id);

      if (enrollment) student.enrollment = enrollment;
      if (firstName) student.firstName = firstName;
      if (lastName) student.lastName = lastName;
      if (gender) student.gender = gender;
      if (phone) student.phone = phone;
      if (address) student.address = address;
      if (birthday) student.birthday = birthday;
      if (birthPlace) student.birthPlace = birthPlace;
      if (fatherName) student.fatherName = fatherName;
      if (motherName) student.motherName = motherName;
      if (motherOcupation) student.motherOcupation = motherOcupation;
      if (bloodType) student.bloodType = bloodType;
      if (info) student.info = info;
      if (transport) student.transport = transport;
      if (school) student.school = school;
      if (school) student.school = school;
      if (classroom) student.classroom = classroom;
      student.updated = Date.now();

      // console.log(student);
      await student.save();
  
      return res.json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar aluno.',
        error: error.message
      });
    }
  },

  // Delete student from database
  // DELETE /students/:id
  delete: async function (req, res) {
    const { id } = req.params;

    try {
      await Student.findByIdAndRemove(id);
  
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao excluir aluno.' });
    }
  }
};
