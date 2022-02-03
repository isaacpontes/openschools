const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const sequelize = require('../database')
const locale = require('../adminjs/locale');
const resources = require('../adminjs/resources');
const authenticationOptions = require('../adminjs/authentication');

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  resources: resources,
  rootPath: '/admin',
  locale: locale
});

const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, authenticationOptions)

module.exports = {
  adminJs,
  adminJsRouter
}
