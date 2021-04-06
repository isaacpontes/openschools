const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) return done(null, false, { message: 'Este email não está registrado.' });
    
          user.checkPassword(password, (err, isSame) => {
            if (err) return done(err);
            if (!isSame) return done(null, false, { message: 'Email ou senha incorretos.' });
            return done(null, user);
          });
        })
        .catch((error) => console.error(error));
    })
  );
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});