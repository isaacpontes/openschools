const StudentService = require("../../../services/StudentService");

class StudentsController {
  // Return a list of all students
  // GET /api/admin/students
  findAll = async (req, res) => {
    try {
      const students = await StudentService.findAll();
      return res.json(students);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar estudantes',
        error: error.message
      });
    }
  }

  // Save a new student to the database
  // POST /api/admin/students
  save = async (req, res) => {
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

    const student = StudentService.create({
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
    });

    try {
      await StudentService.save(student);

      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao salvar estudante',
        error: error.message
      });
    }
  }

  // Render a single student
  // GET /api/admin/students/:id
  findById = async (req, res) => {
    const { id } = req.params;

    try {
      const student = await StudentService.findById(id);
      return res.json(student);
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar estudante',
        error: error.message
      });
    }
  }

  // Update a student in the database
  // PUT /api/admin/students/:id
  update = async (req, res) => {
    const { id } = req.params;
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

    try {
      const student = await StudentService.findById(id);

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

      await StudentService.save(student);

      return res.json(student)
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao atualizar estudante',
        error: error.message
      });
    }
  }

  // Delete student from database
  // DELETE /api/admin/students/:id
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      await StudentService.deleteOne(id);

      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao retornar escolas',
        error: error.message
      });
    }
  }
}

module.exports = StudentsController;
