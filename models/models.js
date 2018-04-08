'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var BCRYPT_COST = 12;


var userSchema = new Schema({
    name  : {
        givenName   : String,
        familyName  : String
    },
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: String,

});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(BCRYPT_COST, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User', userSchema)
