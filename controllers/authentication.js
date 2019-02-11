const User = require('../models/user');
const jwt = require('jwt-simple');

const { secret } = require('../configs/general-config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res
        .status(422)
        .send({ error: 'Email is taken .. please try another one' });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }

      return res.send({ token: tokenForUser(user) });
    });
  });
};

exports.signin = (req, res, next) => {
  return res.send({ token: tokenForUser(req.user) });
};
