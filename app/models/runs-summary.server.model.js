'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var runsSummarySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  type: String, // Activity e.g. run / cycle
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  distance: {
    type: Number,
    required: 'Distance cannot be blank'
  },
  time: {minutes : Number, seconds : Number},
  totalAvgPace : {minutes: Number, seconds: Number},
  avgPace: [] // array of kms by speed e.g. [ 1 : {minutes: 5, seconds: 35}, 2 : {minutes: 4, seconds: 55} ]
});

mongoose.model('runsSummary', runsSummarySchema);

