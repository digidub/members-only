const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.get = (req, res) => {
  res.render('register');
};

exports.post = [
  body('email').isEmail().bail(),
  body('password').exists(),
  body('confirm-password', 'error: Passwords do not match')
    .exists()
    .custom((value, { req }) => value === req.body.password),
  async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  },
];
