'use strict';
const _ = require('lodash');

module.exports = function (req, res, next) {
  let flash = {
    errorMsg: req.flash('error'),
    successMsg: req.flash('success'),
    warningMsg: req.flash('warning'),
    infoMsg: req.flash('info')
  };

  _.extend(res.locals, flash, {user: req.user});
  next();
};
