'use strict';

const passport = require('../../services/passport');

module.exports = {
  login: function(req, res, user) {
    if(!!req.user){
      return res.redirect('/tasks');
    }
    return res.redirect('/');
  },
  logout: function(req, res){
    req.session.destroy(err => {
      return res.redirect('/');
    })
  }
};
