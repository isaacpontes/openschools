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
      await Student.findByIdAndUpdate(id, {
        enrollment, firstName, lastName, gender, phone, address, birthday,
        birthPlace, fatherName, fatherOcupation, motherName, motherOcupation,
        bloodType, info, transport, school, classroom, updated: Date.now()
      });
  
      return res.status(204).json({ message: 'OK' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar aluno.' });
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
