module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error', 'Você precisar estar logado para acessar este recurso.');
      return res.redirect('/');
    }

    return next();
  },
  ensureAdmin: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error', 'Você precisar estar logado para acessar este recurso.');
      return res.redirect('/');
    }
    if (req.user.role !== 'admin') {
      req.flash('error', 'Você não tem permissão para acessar este recurso.');
      return res.redirect('/dashboard');
    }

    return next();
  }
};
