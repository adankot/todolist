'use strict';

const wrap = require('co-express');

module.exports = {
  index: wrap(function*(req, res) {
    if (!req.user) {
      return res.render('index', {title: 'To do list'});
    }
    return res.redirect('/tasks')
  })
};