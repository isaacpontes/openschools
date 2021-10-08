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

class Database {
  constructor ({ dialect, host, port, name, user, password, options }, connection) {
    this.dialect = dialect;
    this.host = host;
    this.port = port;
    this.name = name;
    this.user = user;
    this.password = password;
    this.options = options;
    this.connection = connection;
  }

  async connect() {
    const connString = `${this.dialect}://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;

    try {
      this.connection = new Sequelize(connString, this.options);
      await this.connection.authenticate();
      console.log('Successfully connected to PostgreSQL');
    } catch (error) {
      console.log(error);
    }
  }

  initSequelize() {
    User.init(this.connection);
    School.init(this.connection);
    Grade.init(this.connection);
    Classroom.init(this.connection);
    Transport.init(this.connection);
    AcademicYear.init(this.connection);
    Student.init(this.connection);
    Enrollment.init(this.connection);
    Sector.init(this.connection);
    Employee.init(this.connection);

    User.associate(this.connection.models);
    School.associate(this.connection.models);
    Grade.associate(this.connection.models);
    Classroom.associate(this.connection.models);
    Transport.associate(this.connection.models);
    AcademicYear.associate(this.connection.models);
    Student.associate(this.connection.models);
    Enrollment.associate(this.connection.models);
    Sector.associate(this.connection.models);
    Employee.associate(this.connection.models);
  }

  createFirstAdminUser() {
    UserService.countAdminUsers().then(count => {
      if (count > 0) {
        console.log('It looks like you already have a registered Admin user.');
      } else {
        console.log('It looks like your users table is empty.');
        seedAdmin();
      }
    });
  }
}

module.exports = Database;
