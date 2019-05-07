'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
  list: async (req, res) => {
    const userId = req.user._id;
    let tasks = await Task.find({userId, deletedAt: null});
    res.render('tasks', {tasks});
  },
  get: async (req, res) => {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    let task = await Task.findOne({userId, _id: taskId});
    res.send(task);
  },
  create: async (req, res) => {
    const userId = req.user._id;
    if (!req.body.title) {
      req.flash('error', 'Missing params');
      return res.redirect('/tasks');
    }
    let task = new Task({userId, title: req.body.title, description: req.body.description});
    await task.save();
    return res.redirect('/tasks');
  },
  update: async (req, res) => {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    await Task.update({_id: taskId, userId}, {
      title: req.body.title,
      description: req.body.description,
      updatedAt: Date.now()
    });
    return res.redirect('/tasks');
  },
  delete: async (req, res) => {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    let removeQuery = {
      userId
    };
    if(taskId === 'allDone'){
      removeQuery.status = 'DONE';
    }
    if(taskId != 'all' && taskId != 'allDone'){
      removeQuery._id = taskId;
    }
    await Task.remove(removeQuery);
    return res.redirect('/tasks');
  },
  status: async (req, res) => {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    const status = req.params.status;
    await Task.update({_id: taskId, userId}, {
      status,
      updatedAt: Date.now()
    });
    return res.redirect('/tasks');
  },
  deleteAll: async (req, res) => {
    const userId = req.user._id;
    await Task.remove({userId});
    return res.redirect('/tasks');
  },
  deleteAllDone: async (req, res) => {
    const userId = req.user._id;
    await Task.remove({status: 'DONE', userId});
    return res.redirect('/tasks');
  }
};
