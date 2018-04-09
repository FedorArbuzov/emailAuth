var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var config = require('../config/keys');

var User = require('../models/models').User;
var sendEmail = require('../utils/email').sendEmail;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express app' });
});

router.get('/login', function (req, res, next) {
    res.send();
})

router.post('/signup', function(req, res, next) {


    User.findOne({email: req.body.email}, function (err, user) {
        if (err) throw err;
        if (user) {
            res.render('index', {title: 'этот email уже есть'});
        }
        else {
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
            sendEmail(config.host + '/' + authToken, req.body.email);
            res.render('index', {title: 'Sent authentication email'});
        }
    })

});

router.get('/verify/:token', function (req, res, next) {
    console.log("Cookies :  ", req.cookies);
    console.log(req.params.token);
    User.findOne({authToken: req.params.token}, function (err, user) {
        if (err) throw err;
        if (user) {
            user.isAuthenticated = true;

            user.save(function (err) {
                if (err) throw err;

                console.log('User updated!')
            })

            res.cookie('user', '123', { maxAge: 900000, httpOnly: true }).send('cookie is set');
        }
    })
})

router.post('/reset', function(req, res, next){
    res.send();
})

router.get('/account', function(req, res, next) {
    res.render('index', { title: 'Account' });
});

module.exports = router;
