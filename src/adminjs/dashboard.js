const AdminJs = require('adminjs');
const Employee = require('../models/Employee');
const School = require('../models/School');
const Sector = require('../models/Sector');
const Student = require('../models/Student');

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
  component: AdminJs.bundle('../adminjs/components/Dashboard')
};
