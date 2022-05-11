require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL
  },
  test: {
    url: process.env.TEST_DATABASE_URL
  }
};
