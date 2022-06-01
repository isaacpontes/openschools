const models = require('../../database/models');
const classroomOptions = require('./classroomOptions');
const schoolOptions = require('./schoolOptions');
const studentOptions = require('./studentOptions');
const enrollmentOptions = require('./enrollmentOptions');
const gradeOptions = require('./gradeOptions');
const employeeOptions = require('./employeeOptions');
const academicYearOptions = require('./academicYearOptions');
const sectorOptions = require('./sectorOptions');
const transportOptions = require('./transportOptions');
const userOptions = require('./userOptions');

module.exports = [
  { resource: models.School, options: schoolOptions },
  { resource: models.Classroom, options: classroomOptions },
  { resource: models.Student, options: studentOptions },
  { resource: models.Enrollment, options: enrollmentOptions },
  { resource: models.Sector, options: sectorOptions },
  { resource: models.Employee, options: employeeOptions },
  { resource: models.AcademicYear, options: academicYearOptions },
  { resource: models.Grade, options: gradeOptions },
  { resource: models.Transport, options: transportOptions },
  { resource: models.User, options: userOptions },
];
