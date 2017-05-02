'use strict';

const wrap = require('co-express');

module.exports = {
  index: wrap(function*(req, res) {
    res.render('index', { title: 'Todo list' });
  })
};