'use strict';

// import the moongoose helper utilities
var utils = require('../utils');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should;
var app = require('../../app');

chai.use(chaiHttp);

describe('Users: routes', function () {
    describe('POST /signup', function () {
        it('should redirect to "/account" if the form is valid', function (done) {
            var post = {
                givenName: 'Barrack',
                familyName: 'Obama',
                email: 'berry@example.com',
                password: 'secret'
            };
            chai.request(app)
                .get('/signup')
                .end(function (err, res) {
                    //should.not.exist(err);
                    // confirm the redirect
                    console.log(res.req.path.includes('/account'))
                    res.req.path.includes('/account').should.be.true();
                    done();
                });
        });
    });
});