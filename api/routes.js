'use strict';

const express = require('express');
const router = express.Router();

const passport = require('../services/passport');

// Middlewares
const authMiddleware = require('./middlewares/auth');

// Controllers
const indexController = require('./controllers/index');
const userController = require('./controllers/user');
const taskController = require('./controllers/task');

router.get('/', indexController.index);

router.post('/login', passport.authenticate('local-login'), userController.login);
router.post('/register', passport.authenticate('local-register'), userController.login);
router.get('/logout', authMiddleware, userController.logout);

router.get('/tasks', authMiddleware, taskController.list);
router.get('/tasks/:taskId', authMiddleware, taskController.get);

router.post('/tasks', authMiddleware, taskController.create);
router.post('/tasks/:taskId', authMiddleware, taskController.update);

router.get('/tasks/:taskId/delete', authMiddleware, taskController.delete);

module.exports = router;
