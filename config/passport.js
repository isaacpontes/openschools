const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsersService = require('../services/UsersService');

const usersService = new UsersService();

function passportLocal(passport) {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
      usersService.findByEmail(email)
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Este email não está registrado.' });
          }

          user.checkPassword(password, (err, isSame) => {
            if (err) {
              return done(err);
            }

            if (!isSame) {
              return done(null, false, { message: 'Email ou senha incorretos.' });
            }

            return done(null, user);
          });
        })
        .catch((error) => console.error(error));
    })
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  usersService.findById(id)
    .then(user => {
      done(null, user.get());
    }).catch(error => {
      done(error, null);
    });
});

module.exports = passportLocal;
