'use strict';

// import the moongoose helper utilities
var utils = require('./utils');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = require('should');
var app = require('../app');


chai.use(chaiHttp);

describe('addition', function () {
    //... previous test
    it('should return 2 given the url /add/1/1', function (done) {
        chai.request(app)
            .get('/add/1/1')
            .end(function (err, res) {
                should.not.exist(err);
                console.log(parseFloat(res.text));
                parseFloat(res.text).should.equal(2);
                done();
            });
    });
});