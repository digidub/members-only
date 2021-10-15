const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcryptjs');

const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .is()
  .not()
  .oneOf(['P4ssw0rd', 'Password123']);

exports.get = (req, res) => {
  res.render('register');
};

exports.post = [
  body('email').isEmail().bail(),
  body('password')
    .exists()
    .custom((value) => schema.validate(value) === true)
    .bail(),
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
