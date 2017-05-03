'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const port = process.env.PORT || '3000';
const app = express();

app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('keyboard cat'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new RedisStore({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    db: 0,
    ttl: null
  }),
  secret: process.env.SESSION_SECRET || 'secret',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  name: 'todo.sid'
}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist');

mongoose.connection.on('open', () => {
  require('./models/User');
  require('./models/Task');
  const passport = require('./services/passport');
  app.use(session({secret: 'keyboard cat'}));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.loadStrategies();
  app.use(require('./routes.js'));
  console.log('Mongodb connected');
  app.listen(port, () => {
    console.log('Express app started on port ' + port);
  });
});
