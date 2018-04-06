var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express app' });
});

router.get('/signup', function(req, res, next) {
    res.redirect('/account');
});

router.get('/account', function(req, res, next) {
    res.render('index', { title: 'Account' });
});

module.exports = router;
