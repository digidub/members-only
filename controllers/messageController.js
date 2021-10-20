const Message = require('../models/message');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.checkAuthorised = function (req, res, next) {
  if (!res.locals.currentUser) {
    res.redirect('/');
  } else if (res.locals.currentUser.membershipStatus !== 'confirmed') {
    res.render('member-area', { confirmed: false });
  }
  next();
};

exports.index = async function (req, res, next) {
  const messages = await Message.find({}, 'subject message author')
    .sort({ date: -1 })
    .populate('subject message author');
  res.render('message-list', messages);
};

exports.postMessageGet = async function (req, res, next) {
  res.render('message-post');
};

exports.postMessagePost = [
  body('subject', 'Subject must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('message').trim().isLength({ min: 10 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      subject: req.body.subject,
      message: req.body.message,
      author: res.locals.currentUser._id,
    });
    if (!errors.isEmpty()) {
      res.render('message-post', {
        subject: req.body.subject,
        message: req.body.message,
      });
    } else {
      await message.save();
      res.redirect('/messages');
    }
  },
];
