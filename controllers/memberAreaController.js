const User = require('../models/user');

exports.get = async (req, res, next) => {
  console.log(res.locals.currentUser);

  if (res.locals.currentUser.membershipStatus !== 'confirmed') {
    res.render('member-area', { confirmed: false });
  }
};
