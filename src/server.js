const { app } = require('./app');
const Database = require('./database');

const PORT = process.env.PORT || 5000;

const db = new Database({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  options: { define: { timestamps: true, underscored: true } }
});

db.connect()
  .then(() => {
    db.initSequelize();
    db.createFirstAdminUser();
  });


app.listen(PORT, console.log(`Server started successfully at port ${PORT}`));
