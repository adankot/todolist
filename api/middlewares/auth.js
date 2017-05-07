'use strict';

module.exports = function (req, res, next) {
  if(!req.user){
    req.flash('error', 'Unauthorized');
    return res.redirect('/');
  }
  return next();
};