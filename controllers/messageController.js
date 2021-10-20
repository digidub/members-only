const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.postMessageGet = async function (req, res, next) {
  res.render('message-post');
};

exports.postMessagePost = async function (req, res, next) {
  body('subject', 'Subject must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape();
  body('message').trim().isLength({ min: 10 }).escape();
  async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      subject: req.body.subject,
      message: req.body.message,
    });

    if (!errors.isEmpty()) {
      res.render('message-post', { subject, message });
    } else {
      await message.save();
      res.redirect('/messages');
    }
  };
};
