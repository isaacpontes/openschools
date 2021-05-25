const Employee = require("../../models/employee");
const School = require("../../models/school");
const Student = require("../../models/student");

module.exports = {
  // Render a list of all employees
  // GET /employees
  index: async function (req, res) {

    try {
      const schoolsCount = await School.countDocuments();
      const studentsCount = await Student.countDocuments();
      const employeesCount = await Employee.countDocuments();

      return res.render('admin/dashboard', {
        schoolsCount,
        studentsCount,
        employeesCount
      });
    } catch (error) {
      return res.render('pages/error', { error: 'Erro ao carregar dashboard.' });
    }
  },
}
