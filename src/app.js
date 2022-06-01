const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const Database = require('./database');
const Admin = require('./admin');

class App {
    constructor() {
        // Express app
        this.express = express();
        this.database = new Database()
        this.admin = new Admin('/admin', [this.database.adapter.sequelize])
        this.addMiddlewares()
        this.addRoutes()
    }

    addMiddlewares() {
        // CORS
        this.express.use(cors());
        // Static Files
        this.express.use(express.static('public'));
        // JSON middleware
        this.express.use(express.json());
        // Morgan logs
        this.express.use(morgan('dev'));
    }

    addRoutes() {
        // AdminJS Dashboard Routes
        this.express.use(this.admin.rootPath, this.admin.router);
        // API Routes
        this.express.use('/api', router);
    }

    run() {
        const PORT = process.env.PORT || 5000;

        this.express.listen(PORT, () => {
            console.log(`Server started successfully at port ${PORT}`);
        });
    }
}

module.exports = App
