const { Sequelize } = require('sequelize');
const models = require('../models');

class PostgresConnectionAdapter {
  constructor(connectionString, customOptions) {
    const defaultOptions = { define: { underscored: true } };
    const options = Object.assign({}, defaultOptions, customOptions);
    this.sequelize = new Sequelize(connectionString, options);
  }

  prepareModels() {
    const iterableModels = Object.entries(models);
    iterableModels.forEach(keyValuePair => keyValuePair[1].init(this.sequelize));
    iterableModels.forEach(keyValuePair => keyValuePair[1].associate(models));
  }
}

module.exports = PostgresConnectionAdapter;