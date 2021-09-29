const dayjs = require('dayjs');
const Student = require('../models/Student');

class StudentsService {
  create = ({ student_code, first_name, last_name, gender, phone, address, birthday, birth_place, father_name, father_ocupation, mother_name, mother_ocupation, blood_type, info, transport_id }) => {
    const student = Student.build();

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

    return student;
  }

  findAll = async () => {
    const students = await Student.findAll();
    return students;
  }

  findAllWithAcademicYears = async () => {
    const students = await Student.findAll({
      include: [
        { association: 'academicYears' }
      ]
    });
    return students;
  }

  findAllInClassrooms = async (classroomsList) => {
    const students = await Student.find({ classroom: { $in: classroomsList } });
    return students;
  }

  findById = async (id) => {
    const student = await Student.findByPk(id, {
      include: 'transport'
    });
    return student;
  }

  findByClassroomId = async (classroomId) => {
    // const students = await Student.findAll({
    //   where: {

    //   }
    // });
    // return students;
  }

  save = async (student) => {
    await student.save();
    return student;
  }

  update = async (id, student_code, first_name, last_name, gender, phone, address, birthday, birth_place, father_name, father_ocupation, mother_name, mother_ocupation, blood_type, info, transport_id, school, classroom) => {
    await Student.update({
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
    }, {
      where: { id }
    });
  }

  delete = async (id) => {
    await Student.destroy({ where: { id } });
  }

  generatePdfList = async (pdf) => {
    const students = await this.findAll();

    const marginLeft = 0 + 40;
    const marginRight = pdf.page.width - 40;
    const student_codeX = 60;
    const nameX = 140;
    const phoneX = 320;
    const schoolX = 422;

    pdf.fontSize(14)
      .moveDown(2)
      .text('Listagem de Alunos', 60);
    pdf.moveTo(marginLeft, 128).lineTo(marginRight, 128).stroke();
    pdf.fontSize(11)
      .font('Helvetica-Bold')
      .text('Matrícula', student_codeX, 140, { lineBreak: false, bold: true })
      .text('Nome Completo', nameX, 140, { lineBreak: false })
      .text('Telefone', phoneX, 140, { lineBreak: false })
      .font('Helvetica')
      .moveTo(marginLeft, 160).lineTo(marginRight, 160).stroke()
    ;

    pdf.on('pageAdded', () => {
      pdf.fontSize(14)
        .moveDown(2)
        .text('Listagem de Alunos', 60);
      pdf.moveTo(marginLeft, 128).lineTo(marginRight, 128).stroke();
      pdf.fontSize(11)
        .font('Helvetica-Bold')
        .text('Matrícula', student_codeX, 140, { lineBreak: false })
        .text('Nome Completo', nameX, 140, { lineBreak: false })
        .text('Telefone', phoneX, 140, { lineBreak: false })
        .font('Helvetica')
        .moveTo(marginLeft, 160).lineTo(marginRight, 160).stroke()
      ;
      rowY = 170;
    });

    let rowY = 170;

    students.forEach(student => {
      pdf.text(student.student_code, student_codeX, rowY, {
          width: 80, height: 12
        })
        .text(`${student.first_name} ${student.last_name}`, nameX, rowY, {
          width: 180, height: 12
        })
        .text(student.phone, phoneX, rowY, {
          width: 102, height: 12
        })
      ;

      rowY += 22;

      if (rowY >= pdf.page.height - 82) {
        pdf.addPage();
      }
    });

    const range = pdf.bufferedPageRange();

    for (let i = range.start; i <= (pdf._pageBufferStart + pdf._pageBuffer.length - 1); i++) {
      pdf.switchToPage(i);
      pdf.image('public/images/logo.png', (pdf.page.width - 48) / 2, 24, { fit: [48, 48] });
      pdf.text('Prefeitura Municipal de São Fidélis', 0, 80, { align: 'center', width: pdf.page.width });
      pdf.fontSize(8)
        .text(`Página ${i + 1} | Gerado em ${dayjs(Date.now()).format('DD/MM/YYYY')}`, 90, pdf.page.height - 40, { lineBreak: false })
        .fontSize(11)
      ;
    }
  }
}

module.exports = StudentsService;
