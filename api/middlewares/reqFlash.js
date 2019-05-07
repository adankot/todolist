'use strict';

module.exports = function (req, res, next) {
  let flash = {
    errorMsg: req.flash('error'),
    successMsg: req.flash('success'),
    warningMsg: req.flash('warning'),
    infoMsg: req.flash('info')
  };

  res.locals = Object.assign(res.locals, flash, {user: req.user});
  next();
};
