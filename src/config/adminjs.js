const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const sequelize = require('../database')

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/dashboard'
});

const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

module.exports = {
  adminJs,
  adminJsRouter
}
