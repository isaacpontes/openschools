const AdminJs = require('adminjs');
const { Employee, School, Sector, Student } = require('../database/models');

module.exports = {
  handler: async (req, res, context) => {
    try {
      const employees = await Employee.count()
      const sectors = await Sector.count()
      const schools = await School.count()
      const students = await Student.count()

      res.json({
        'Funcionários': employees,
        'Setores': sectors,
        'Escolas': schools,
        'Estudantes': students
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  },
  component: AdminJs.bundle('./components/Dashboard')
};
