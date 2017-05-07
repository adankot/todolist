'use strict';

const wrap = require('co-express');

const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
  list: wrap(function*(req, res) {
    const userId = req.user._id;
    let tasks = yield Task.find({userId, deletedAt: null});
    res.render('tasks', {tasks});
  }),
  get: wrap(function*(req, res) {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    let task = yield Task.findOne({userId, _id: taskId});
    res.send(task);
  }),
  create: wrap(function*(req, res) {
    const userId = req.user._id;
    if (!req.body.title) {
      req.flash('error', 'Missing params');
      return res.redirect('/tasks');
    }
    let task = new Task({userId, title: req.body.title, description: req.body.description});
    yield task.save();
    return res.redirect('/tasks');
  }),
  update: wrap(function*(req, res) {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    let task = yield Task.update({_id: taskId, userId}, {
      title: req.body.title,
      description: req.body.description,
      updatedAt: Date.now()
    }, {new: true});
    res.send(task);
  }),
  delete: wrap(function*(req, res) {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    yield Task.remove({_id: taskId, userId});
    res.redirect('/tasks');
  }),
};
