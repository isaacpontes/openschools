const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const locale = require('./locale');
const resources = require('./resources');
const authentication = require('./authentication');
const branding = require('./branding');
const dashboard = require('./dashboard');

class Admin {
  constructor(rootPath, databases) {
    AdminJS.registerAdapter(AdminJSSequelize);
    this.rootPath = rootPath
    this.instance = new AdminJS({
      rootPath,
      databases,
      resources,
      locale,
      branding,
      dashboard
    });
    this.router = AdminJSExpress.buildAuthenticatedRouter(
      this.instance,
      authentication,
      null,
      { resave: false, saveUninitialized: false }
    );
  }
}

module.exports = Admin
