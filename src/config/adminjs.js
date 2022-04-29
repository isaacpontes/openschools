const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const sequelize = require('../database');
const locale = require('../adminjs/locale');
const resources = require('../adminjs/resources');
const authenticationOptions = require('../adminjs/authentication');
const branding = require('../adminjs/branding');
const dashboard = require('../adminjs/dashboard');

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  resources: resources,
  rootPath: '/admin',
  locale: locale,
  branding: branding,
  dashboard: dashboard
});

const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, authenticationOptions, null, {
  resave: false,
  saveUninitialized: false
});

module.exports = {
  adminJs,
  adminJsRouter
};
