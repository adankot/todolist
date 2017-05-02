'use strict';

const express = require('express');
const router = express.Router();

const passport = require('../services/passport');

// Controllers

const indexController = require('./controllers/index');
const userController = require('./controllers/user');
const taskController = require('./controllers/task');

router.get('/', indexController.index);

router.post('/login', passport.authenticate('local-login'), userController.login);
router.post('/register', userController.register);

router.get('/tasks', taskController.list);
router.get('/tasks/:taskId', taskController.get);

router.post('/tasks', taskController.create);
router.post('/tasks/:taskId', taskController.update);

router.delete('/tasks/:taskId', taskController.delete);

module.exports = router;
