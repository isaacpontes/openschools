const Employee = require("../../models/employee");
const School = require("../../models/school");
const Student = require("../../models/student");
const Sector = require("../../models/sector");
const Grade = require("../../models/grade");

module.exports = {
  // Render a list of all employees
  // GET /employees
  index: async function (req, res) {

    try {
      const schools = await School.find({});
      const grades = await Grade.find({});
      const students = await Student.find({}).populate('classroom');
      const employees = await Employee.find({});
      const sectors = await Sector.find({});
      const schoolsCount = schools.length;
      const studentsCount = students.length;
      const employeesCount = employees.length;

      const schoolNames = [];
      const schoolStudents = [];
      const gradeNames = [];
      const gradeStudents = [];
      const sectorNames = [];
      const sectorEmployees = [];

      schools.forEach(school => {
        schoolNames.push(school.name);

        let count = 0;
        students.forEach(student => {
          count += student.school.equals(school._id) ? 1 : 0;
        });
        schoolStudents.push(count);
      });

      grades.forEach(grade => {
        gradeNames.push(grade.name);

        let count = 0;
        students.forEach(student => {
          count += student.classroom.grade.equals(grade._id) ? 1 : 0;
        });
        gradeStudents.push(count);
      });

      sectors.forEach(sector => {
        sectorNames.push(sector.name);

        let count = 0;
        employees.forEach(employee => {
          count += employee.currentSector.equals(sector._id) ? 1 : 0;
        });
        sectorEmployees.push(count);
      });

      return res.render('admin/dashboard', {
        schoolsCount,
        studentsCount,
        employeesCount,
        schoolNames,
        schoolStudents,
        gradeNames,
        gradeStudents,
        sectorNames,
        sectorEmployees
      });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  },
}
