const passport = require('passport');
const passportConfig = require('./configs');

const { signup, signin } = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const checkAuth = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ success: true });
  });
  app.post('/signup', signup);
  app.post('/signin', checkAuth, signin);
};
