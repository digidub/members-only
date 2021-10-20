const User = require('../models/user');

exports.get = async (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect('/');
  }

  if (res.locals.currentUser.membershipStatus !== 'confirmed') {
    res.render('member-area', { confirmed: false });
  }

  res.render('member-area', { confirmed: true });
};

exports.post = async (req, res, next) => {
  if (req.body.password === 'LetMeIn') {
    const updateUser = await User.findOneAndUpdate(
      { username: res.locals.currentUser.username },
      { membershipStatus: 'confirmed' },
      { new: true }
    );
    res.redirect('/member-area');
  }
};
