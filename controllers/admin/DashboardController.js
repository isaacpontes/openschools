const Controller = require('../Controller');
const EmployeesService = require("../../services/EmployeesService");
const SchoolsService = require("../../services/SchoolsService");
const GradesService = require("../../services/GradesService");
const StudentsService = require("../../services/StudentsService");
const SectorsService = require("../../services/SectorsService");

class DashboardController extends Controller {
  // Render a list of all employees
  // GET /employees
  index = async (req, res) => {
    const employeesService = new EmployeesService();
    const gradesService = new GradesService();
    const schoolsService = new SchoolsService();
    const sectorsService = new SectorsService();
    const studentsService = new StudentsService();

    try {
      const employees = await employeesService.findAll();
      const grades = await gradesService.findAll();
      const schools = await schoolsService.findAll();
      const sectors = await sectorsService.findAll();
      const students = await studentsService.findAll({ path: 'classroom' });

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
  }
}

module.exports = DashboardController;
