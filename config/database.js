const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const seedAdmin = require('../database/seedAdmin');
const UsersService = require('../services/UsersService');
const User = require('../models/User');
const School = require('../models/School');
const Grade = require('../models/Grade');
const Classroom = require('../models/Classroom');
const Transport = require('../models/Transport');

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

    School.associate(this.connection.models);
    Classroom.associate(this.connection.models);
  }

  createFirstAdminUser() {
    const usersService = new UsersService();

    usersService.countAdminUsers().then(count => {
      if (count > 0) {
        console.log('It looks like you already have a registered Admin user.');
      } else {
        console.log('It looks like your users table is empty.');
        seedAdmin(usersService);
      }
    });
  }

  // async connectMongo() {
  //   const connectionString = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.name}`;

  //   try {
  //     const mongo = await mongoose.connect(connectionString, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       useCreateIndex: true,
  //       useFindAndModify: false,
  //     });

  //     this.connection = mongo.connection;
  //     console.log('Successfully connected to MongoDB.');

  //   } catch (error) {
  //     console.log(error);
  //   }    
  // }
}

module.exports = Database;
