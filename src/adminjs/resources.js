const Classroom = require('../models/Classroom');
const classroomOptions = require('./resources/classroomOptions');
const School = require('../models/School');
const schoolOptions = require('./resources/schoolOptions');
const Student = require('../models/Student');
const studentOptions = require('./resources/studentOptions');
const Enrollment = require('../models/Enrollment');
const enrollmentOptions = require('./resources/enrollmentOptions');
const Grade = require('../models/Grade');
const gradeOptions = require('./resources/gradeOptions');
const Employee = require('../models/Employee');
const employeeOptions = require('./resources/employeeOptions');
const AcademicYear = require('../models/AcademicYear');
const academicYearOptions = require('./resources/academicYearOptions');
const Sector = require('../models/Sector');
const sectorOptions = require('./resources/sectorOptions');
const Transport = require('../models/Transport');
const transportOptions = require('./resources/transportOptions');
const User = require('../models/User');
const userOptions = require('./resources/userOptions');

module.exports = [
  { resource: School, options: schoolOptions },
  { resource: Classroom, options: classroomOptions },
  { resource: Student, options: studentOptions },
  { resource: Enrollment, options: enrollmentOptions },
  { resource: Sector, options: sectorOptions },
  { resource: Employee, options: employeeOptions },
  { resource: AcademicYear, options: academicYearOptions },
  { resource: Grade, options: gradeOptions },
  { resource: Transport, options: transportOptions },
  { resource: User, options: userOptions },
];
