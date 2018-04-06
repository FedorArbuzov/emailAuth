'use strict';

// import the moongoose helper utilities
var utils = require('../utils');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should;
var app = require('../../app');
var passport = require('passport');

var User = require('../../user/models').User;

chai.use(chaiHttp);


describe('Users: routes', function () {
    describe('POST /signup', function () {
        //... previous tests
        it('should create a new User if the form is valid', function (done) {
            var post = {
                givenName: 'Barrack',
                familyName: 'Obama',
                email: 'berry@example.com',
                password: 'secret'
            };
            chai.request(app)
                .post('/signup')
                .send(post)
                .end(function (err, res) {
                    User.find(function (err, users) {
                        users.length.should.equal(1);
                        var u = users[0];
                        // Make sure the user values match up.
                        u.name.givenName.should.equal(post.givenName);
                        u.name.familyName.should.equal(post.familyName);
                        u.emails[0].value.should.equal(post.email);
                        //should.exist(u.passwordHash);
                        done();
                    });
                });
        });
    });
});