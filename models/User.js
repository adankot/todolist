'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

schema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (!!err) {
      return next(err);
    }
    this.password = hash;
    return next();
  })
});

schema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
};

let model = mongoose.model('User', schema, 'users');

module.export = model;