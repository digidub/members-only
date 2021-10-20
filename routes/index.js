const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const memberAreaController = require('../controllers/memberAreaController');

router.get('/', function (req, res, next) {
  if (res.locals.currentUser) res.redirect('/member-area');
  res.render('index', {
    title: 'Members Only Club',
    message: req.flash(),
  });
});
router.get('/register', registerController.get);
router.post('/register', registerController.post);
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/member-area', memberAreaController.get);
router.post('/member-area', memberAreaController.post);
module.exports = router;
