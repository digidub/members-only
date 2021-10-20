const Message = require('../models/message');

exports.messagePost = async function (req, res, next) {
  res.render('message-post');
};
