const PostgresConnectionAdapter = require('./adapters/PostgresConnectionAdapter');

class Database {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    this.adapter = new PostgresConnectionAdapter(connectionString);
    this.adapter.prepareModels();
  }
}

module.exports = Database;
