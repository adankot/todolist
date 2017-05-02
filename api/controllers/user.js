'use strict';

const wrap = require('co-express');

const passport = require('../../services/passport');

module.exports = {
  register: wrap(function*(req, res) {
    if (!req.query.username || !req.query.password) {
      res.send('Missing params');
    }
    const responseHandler = function (err, user, challenges) {
      if (!!err) {
        res.send('Error');
      }
      if (!user) {
        res.send('Missing account');
      }
      req.user = user;
      res.redirect(`/account/${user.id}/tasks`);
    };

    return passport.authenticate('local-register', responseHandler)(req, res, responseHandler);
  }),
  login: wrap(function*(req, res) {
    if(!!req.user){
      res.redirect('/tasks');
    }
  })
};
