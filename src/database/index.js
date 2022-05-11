const { Sequelize } = require('sequelize');

function connect() {
  const databaseUrl = process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL

  const sequelize = new Sequelize(databaseUrl, {
    define: { underscored: true }
  });

  return sequelize
}

module.exports = { connect };
