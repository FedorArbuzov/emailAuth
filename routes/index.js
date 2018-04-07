var express = require('express');
var router = express.Router();

var User = require('../user/models').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express app' });
});

router.post('/login', function (req, res, next) {
    res.send();
})

router.post('/signup', function(req, res, next) {
    res.send();
});

router.post('/reset', function(req, res, next){
    res,send();
})

router.get('/account', function(req, res, next) {
    res.render('index', { title: 'Account' });
});

module.exports = router;
