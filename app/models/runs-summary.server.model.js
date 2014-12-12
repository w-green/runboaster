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
  runId: {
    type: Schema.ObjectId,
    ref: 'runsData'
  },
  totalDistanceKm: {
    type: Number,
    required: 'Distance cannot be blank'
  },
  totalTime: Number,
  startTime : {
    type : Date,
    required: 'start time cannot be blank'
  },
  endTime : {
    type : Date,
    required: 'end time cannot be blank'
  },
  markerItems : [],
  avgSpeedPerKm : Number,
  restDuration : Number
});

mongoose.model('runsSummary', runsSummarySchema);

