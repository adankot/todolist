'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let schema = new Schema({
  userId: {type: ObjectId, ref: 'User', index: true},
  title: {type: String, required: true},
  description: {type: String},
  status: {type: String, enum: ['NEW', 'IN-PROGRESS', 'COMPLETE'], default: 'NEW'}
}, {timestamps: true});

module.export = mongoose.model('Task', schema, 'tasks');