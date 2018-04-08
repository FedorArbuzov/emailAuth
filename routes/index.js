var express = require('express');
var crypto = require('crypto');

var router = express.Router();

var User = require('../models/models').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express app' });
});

router.get('/login', function (req, res, next) {
    var newUser = new User({
        email: '123',
        password: '123',
        authToken: '123',
        isAuthenticated: false
    });
    console.log(newUser);
    newUser.save(function(err, newUser) {
        if (err) {
            throw ErrorEvent();
            console.error(err);
        }
        console.dir(newUser);
    });
    res.send();
})

router.post('/signup', function(req, res, next) {
    console.log('user email: ', req.body.email);
    console.log('user password: ', req.body.password);

    //generate authentication token
    var seed = crypto.randomBytes(20);
    var authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex');

    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        authToken: authToken,
        isAuthenticated: false
    });
    console.log(newUser);
    newUser.save(function(err, newUser) {
        if (err) {
            console.error(err);
        }
        console.dir(newUser);
    });

    res.render('index', {title: 'Sent authentication email'});
});

router.post('/reset', function(req, res, next){
    res.send();
})

router.get('/account', function(req, res, next) {
    res.render('index', { title: 'Account' });
});

module.exports = router;
