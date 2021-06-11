const { app } = require('./bootstrap');

// Database configuration and connection
require('./config/database');

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started successfully at port ${PORT}`));
