'use strict';

const passport = require('../../services/passport');

module.exports = {
  login: (req, res, user) => {
    if(!!req.user){
      return res.redirect('/tasks');
    }
    return res.redirect('/');
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      return res.redirect('/');
    })
  }
};
