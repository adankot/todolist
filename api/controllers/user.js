'use strict';

const wrap = require('co-express');

const passport = require('../../services/passport');

module.exports = {
  login: wrap(function*(req, res) {
    if(!!req.user){
      res.redirect('/tasks');
    }
  })
};
