const User = require('../models/user');

exports.get = async (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect('/');
    next();
  }

  if (res.locals.currentUser.membershipStatus !== 'confirmed') {
    res.render('member-area', { confirmed: false });
  }
};

exports.post = async (req, res, next) => {
  console.log(res.locals.currentUser);
  if (req.body.password === 'LetMeIn') {
    const verifyMember = await User.find({
      username: res.locals.currentUser.username,
    });
    verifyMember.membershipStatus = 'confirmed';
    res.redirect('/member-area');
  }
};
