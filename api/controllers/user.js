'use strict';

const wrap = require('co-express');

const passport = require('../../services/passport');

module.exports = {
  login: function(req, res) {
    if(!!req.user){
      res.redirect('/tasks');
    }
  },
  logout: function(req, res){
    req.session.destroy(err => {
      return res.redirect('/');
    })
  }
};
