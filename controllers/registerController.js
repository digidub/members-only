const User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.get = async (req, res) => {
  res.render('register');
};
