const { App } = require('./App');

const PORT = process.env.PORT || 5000;

const app = new App()
app.start(PORT, () => {
  console.log(`Server started successfully at port ${PORT}`)
});
