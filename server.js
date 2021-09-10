const { app } = require('./app');
const Database = require('./config/Database');

const PORT = process.env.PORT || 5000;

const db = new Database({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});

db.connect()
  .then(() => {
    app.listen(PORT, console.log(`Server started successfully at port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
