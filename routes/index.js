const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const memberAreaController = require('../controllers/memberAreaController');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only Club', user: req.user });
});
router.get('/register', registerController.get);
router.post('/register', registerController.post);
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/member-area', memberAreaController.get);
module.exports = router;
