const User = require('../models/user');

exports.get = (req, res, next) => {
  res.render('member-area');
};
