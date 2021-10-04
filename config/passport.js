const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/UserService');

const userService = new UserService();

function passportLocal(passport) {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
      userService.findByEmail(email)
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
  userService.findById(id)
    .then(user => {
      done(null, user.get());
    }).catch(error => {
      done(error, null);
    });
});

module.exports = passportLocal;
