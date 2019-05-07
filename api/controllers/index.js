'use strict';

module.exports = {
  index: (req, res) => {
    if (!req.user) {
      return res.render('index', {title: 'To do list'});
    }
    return res.redirect('/tasks')
  }
};
