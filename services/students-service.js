const dayjs = require('dayjs');
const Student = require('../models/student');

module.exports = {
  create: function (enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom) {
    const student = new Student();
    if (typeof enrollment !== 'undefined') {
      student.enrollment = enrollment;
    }
    if (typeof firstName !== 'undefined') {
      student.firstName = firstName;
    }
    if (typeof lastName !== 'undefined') {
      student.lastName = lastName;
    }
    if (typeof gender !== 'undefined') {
      student.gender = gender;
    }
    if (typeof phone !== 'undefined') {
      student.phone = phone;
    }
    if (typeof address !== 'undefined') {
      student.address = address;
    }
    if (typeof birthday !== 'undefined') {
      student.birthday = birthday;
    }
    if (typeof birthPlace !== 'undefined') {
      student.birthPlace = birthPlace;
    }
    if (typeof fatherName !== 'undefined') {
      student.fatherName = fatherName;
    }
    if (typeof fatherOcupation !== 'undefined') {
      student.fatherOcupation = fatherOcupation;
    }
    if (typeof motherName !== 'undefined') {
      student.motherName = motherName;
    }
    if (typeof motherOcupation !== 'undefined') {
      student.motherOcupation = motherOcupation;
    }
    if (typeof bloodType !== 'undefined') {
      student.bloodType = bloodType;
    }
    if (typeof info !== 'undefined') {
      student.info = info;
    }
    if (typeof transport !== 'undefined') {
      student.transport = transport;
    }
    if (typeof school !== 'undefined') {
      student.school = school;
    }
    if (typeof classroom !== 'undefined') {
      student.classroom = classroom;
    }
    return student;
  },

  findAll: async function (populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const students = await Student.find({});
      return students;
    }
    const students = await Student.find({}).populate(populateOptions);
    return students;
  },

  findById: async function (id, populateOptions) {
    if (typeof populateOptions === 'undefined') {
      const student = await Student.findById(id);
      return student;
    }
    const student = await Student.findById(id).populate(populateOptions);
    return student;
  },

  findByClassroomId: async function (classroomId) {
    const students = await Student.find({ classroom: classroomId });
    return students;
  },

  save: async function (student) {
    await student.save();
    return student;
  },

  update: async function (id, enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom) {
    await Student.findByIdAndUpdate(id, { enrollment, firstName, lastName, gender, phone, address, birthday, birthPlace, fatherName, fatherOcupation, motherName, motherOcupation, bloodType, info, transport, school, classroom, updated: Date.now() });
  },

  delete: async function (id) {
    await Student.findByIdAndRemove(id);
  },

  generatePdfList: async function (pdf) {
    const students = await this.findAll({ path: 'school' });

    const marginLeft = 0 + 40;
    const marginRight = pdf.page.width - 40;
    const enrollmentX = 60;
    const nameX = 140;
    const phoneX = 320;
    const schoolX = 422;

    pdf.fontSize(14)
      .moveDown(2)
      .text('Listagem de Alunos', 60);
    pdf.moveTo(marginLeft, 128).lineTo(marginRight, 128).stroke();
    pdf.fontSize(11)
      .font('Helvetica-Bold')
      .text('Matrícula', enrollmentX, 140, { lineBreak: false, bold: true })
      .text('Nome Completo', nameX, 140, { lineBreak: false })
      .text('Telefone', phoneX, 140, { lineBreak: false })
      .text('Escola', schoolX, 140, { lineBreak: false })
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
        .text('Matrícula', enrollmentX, 140, { lineBreak: false })
        .text('Nome Completo', nameX, 140, { lineBreak: false })
        .text('Telefone', phoneX, 140, { lineBreak: false })
        .text('Escola', schoolX, 140, { lineBreak: false })
        .font('Helvetica')
        .moveTo(marginLeft, 160).lineTo(marginRight, 160).stroke()
      ;
      rowY = 170;
    });

    let rowY = 170;

    students.forEach(student => {
      pdf.text(student.enrollment, enrollmentX, rowY, {
          width: 80, height: 12
        })
        .text(`${student.firstName} ${student.lastName}`, nameX, rowY, {
          width: 180, height: 12
        })
        .text(student.phone, phoneX, rowY, {
          width: 102, height: 12
        })
        .text(student.school.name, schoolX, rowY, {
          width: 150, height: 12
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
