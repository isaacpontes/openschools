const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const sequelize = require('../database')
const locale = require('../adminjs/locale');
const resources = require('../adminjs/resources');

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  resources: resources,
  rootPath: '/dashboard',
  locale: locale
});

const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

module.exports = {
  adminJs,
  adminJsRouter
}
