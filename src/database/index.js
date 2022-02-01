const { Sequelize } = require('sequelize');
const seedAdmin = require('./seed-admin');
const UserService = require('../services/UserService');
const User = require('../models/User');
const School = require('../models/School');
const Grade = require('../models/Grade');
const Classroom = require('../models/Classroom');
const Transport = require('../models/Transport');
const Student = require('../models/Student');
const AcademicYear = require('../models/AcademicYear');
const Enrollment = require('../models/Enrollment');
const Sector = require('../models/Sector');
const Employee = require('../models/Employee');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

User.init(sequelize);
School.init(sequelize);
Grade.init(sequelize);
Classroom.init(sequelize);
Transport.init(sequelize);
AcademicYear.init(sequelize);
Student.init(sequelize);
Enrollment.init(sequelize);
Sector.init(sequelize);
Employee.init(sequelize);

User.associate(sequelize.models);
School.associate(sequelize.models);
Grade.associate(sequelize.models);
Classroom.associate(sequelize.models);
Transport.associate(sequelize.models);
AcademicYear.associate(sequelize.models);
Student.associate(sequelize.models);
Enrollment.associate(sequelize.models);
Sector.associate(sequelize.models);
Employee.associate(sequelize.models);

UserService.countAdminUsers().then(count => {
  if (count > 0) {
    console.log('It looks like you already have a registered Admin user.');
  } else {
    console.log('It looks like your users table is empty.');
    seedAdmin();
  }
});

module.exports = sequelize;
