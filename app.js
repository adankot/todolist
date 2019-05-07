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
const exphbs = require('express-handlebars');
const flash = require('connect-flash');

const connections = require('./config/connections');

const port = process.env.PORT || '3000';
const app = express();

app.set('port', port);

// view engine setup
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: './views/layouts/',
  partialsDir: './views/partials/'
});

app.engine('.hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new RedisStore(connections.redis),
  secret: process.env.SESSION_SECRET || 'secret',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  name: 'todo.sid'
}));

app.use(flash());

app.engine('.hbs', hbs.engine);

mongoose.Promise = global.Promise;
mongoose.connect(connections.mongodbUri, { useNewUrlParser: true });

mongoose.connection.on('open', () => {
  require('./models/User');
  require('./models/Task');
  const passport = require('./services/passport');
  app.use(passport.initialize());
  app.use(passport.session());
  passport.loadStrategies();
  app.use(require('./routes.js'));
  console.log('Mongodb connected');
  app.listen(port, () => {
    console.log('Express app started on port ' + port);
  });
});
