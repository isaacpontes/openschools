const mongoose = require('mongoose');
const seedAdmin = require('./seed');

class Database {
  constructor ({ host, port, name, username, password }, connection) {
    this.host = host;
    this.port = port;
    this.name = name;
    this.username = username;
    this.password = password;
    this.connection = connection;
  }

  async connect() {
    const connectionString = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.name}`;

    try {
      const mongo = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      this.connection = mongo.connection;
      console.log('Successfully connected to MongoDB.');

      seedAdmin(mongo.connection.collections.users);

    } catch (error) {
      console.log(error);
    }    
  }
}

module.exports = Database;
