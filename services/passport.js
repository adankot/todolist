'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const co = require('co');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const loginHandler = function (req, username, password, done) {
  co(function*() {
    let user = yield User.findOne({
      name: username
    });
    if(!user){
      return done(null, false, 'Wrong username')
    }
    if (yield user.checkPassword(password)) {
      return done(null, user);
    }
    return done(null, false, 'Wrong password');
  });
};

const registerHandler = function (req, username, password, done) {
  co(function*(){
    let user = new User({
      name: username,
      password: password
    });

    try {
      yield user.save();
    } catch (error){
      return done(null, false, 'Username already taken');
    }
    return done(null, user);
  })
};

passport.loadStrategies = function () {
  // Local login
  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    }, loginHandler
  ));

  // Local register
  passport.use('local-register', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    }, registerHandler
  ));
};

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (userId, cb) {
  User.findById(userId)
    .lean()
    .exec(cb);
});

module.exports = passport;