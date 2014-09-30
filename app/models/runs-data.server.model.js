'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var runsDataSchema = new Schema({
  type: String,
  features: [],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

// Compile a 'runsData' model using the runsDataSchema as the structure.
// Mongoose also creates a MongoDB collection called 'runsData' for these documents.
mongoose.model('runsData', runsDataSchema);

