'use strict';

const wrap = require('co-express');

const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
  list: wrap(function*(req, res) {
    const userId = req.user._id;
    let tasks = yield Task.find({userId, deletedAt: null});
    res.send(tasks);
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
      res.send('Missing params');
    }
    let task = new Task({userId, title: req.body.title, description: req.body.description});
    yield task.save();
    res.send(task);
  }),
  update: wrap(function*(req, res) {
    const userId = req.user._id;
    let task = yield Task.update({_id: taskId, userId}, {
      title: req.body.title,
      description: req.body.description,
      updatedAt: Date.now()
    }, {new: true});
    res.send(task);
  }),
  delete: wrap(function*(req, res) {
    const userId = req.user._id;
    let task = yield Task.update({_id: taskId, userId}, {deletedAt: Date.now()}, {new: true});
    res.send(task);
  }),
};
