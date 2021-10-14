const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', registerController.get);

module.exports = router;
