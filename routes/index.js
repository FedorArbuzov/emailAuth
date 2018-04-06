var express = require('express');
var router = express.Router();

var User = require('../user/models').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express app' });
});

router.post('/signup', function(req, res, next) {
    /*
    req.onValidationError(function (msg) {
        //Redirect to `/signup` if validation fails
        return res.redirect('/signup');
    });

    req.check('email', 'Please enter a valid email').len(1).isEmail();
    req.check('password', 'Please enter a password with a length between 4 and 34 digits').len(4, 34);
    req.check('givenName', 'Please enter your first name').len(1);
    req.check('familyName', 'Please enter your last name').len(1);
    */
    // If the form is valid create a new user
    var newUser = {
        name: {
            givenName: req.body.givenName,
            familyName: req.body.familyName
        },
        emails: [
            {
                value: req.body.email
            }
        ]
    };
    console.log(newUser);
    // hash password
    User.hashPassword(req.body.password, function (err, passwordHash) {
        // update attributes
        newUser.passwordHash = passwordHash;
        // Create new user
        User.create(newUser, function (err, user) {
            return res.redirect('/account');
        });
    });
});

router.get('/account', function(req, res, next) {
    res.render('index', { title: 'Account' });
});

module.exports = router;
