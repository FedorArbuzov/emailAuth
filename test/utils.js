'use strict';

//  Modified from https://github.com/elliotf/mocha-mongoose

var config = require('../config/keys');
var mongoose = require('mongoose');

beforeEach(function (done) {

    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove();
        }
        return done();
    }

    function reconnect() {
        mongoose.connect(config.db.test, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    }

    function checkState() {
        switch (mongoose.connection.readyState) {
            case 0:
                reconnect();
                break;
            case 1:
                clearDB();
                break;
            default:
                process.nextTick(checkState);
        }
    }

    checkState();
});

afterEach(function (done) {
    mongoose.disconnect();
    return done();
});