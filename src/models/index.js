const { DataTypes } = require('sequelize')
const { connect } = require('../database')
const academicYear = require('./academicYear')
const classroom = require('./classroom')
const employee = require('./employee')
const enrollment = require('./enrollment')
const grade = require('./grade')
const school = require('./school')
const sector = require('./sector')
const student = require('./student')
const transport = require('./transport')
const user = require('./user')

const sequelize = connect()

const AcademicYear = academicYear(sequelize, DataTypes)
const Classroom = classroom(sequelize, DataTypes)
const Employee = employee(sequelize, DataTypes)
const Enrollment = enrollment(sequelize, DataTypes)
const Grade = grade(sequelize, DataTypes)
const School = school(sequelize, DataTypes)
const Sector = sector(sequelize, DataTypes)
const Student = student(sequelize, DataTypes)
const Transport = transport(sequelize, DataTypes)
const User = user(sequelize, DataTypes)

AcademicYear.associate()
Classroom.associate()
Employee.associate()
Enrollment.associate()
Grade.associate()
School.associate()
Sector.associate()
Student.associate()
Transport.associate()
User.associate()

module.exports = {
    sequelize,
    AcademicYear,
    Classroom,
    Employee,
    Enrollment,
    Grade,
    School,
    Sector,
    Student,
    Transport,
    User
}