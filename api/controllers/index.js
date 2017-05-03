'use strict';

const wrap = require('co-express');

module.exports = {
  index: wrap(function*(req, res) {
    if (!req.user) {
      return res.render('index', {title: 'Todo list'});
    }
    return res.redirect('/tasks')
  })
};