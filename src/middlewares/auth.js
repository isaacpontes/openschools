module.exports = {
  auth: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error', 'Você precisar estar logado para acessar este recurso.');
      return res.redirect('/');
    }
    res.locals.currentUser = req.user;
    return next();
  },
  authManager: (req, res, next) => {
    if (req.user.role !== 'manager') {
      req.flash('error', 'Você não tem permissão para acessar este recurso.');
      return res.redirect('/home');
    }
    return next();
  },
  authAdmin: (req, res, next) => {
    if (req.user.role !== 'admin') {
      req.flash('error', 'Você não tem permissão para acessar este recurso.');
      return res.redirect('/home');
    }
    return next();
  }
};
