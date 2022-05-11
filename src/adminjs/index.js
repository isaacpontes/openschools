const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { sequelize } = require('../models');
const locale = require('./locale');
const resources = require('./resources');
const authenticationOptions = require('./authentication');
const branding = require('./branding');
const dashboard = require('./dashboard');

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  resources: resources,
  rootPath: '/admin',
  locale: locale,
  branding: branding,
  dashboard: dashboard
});

const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false
  }
);

module.exports = {
  adminJs,
  adminJsRouter
};
