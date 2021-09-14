module.exports = {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "openschools_development",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  test: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "openschools_test",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  production: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "openschools_production",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  }
}
