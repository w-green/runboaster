'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  runsSummary = mongoose.model('runsSummary'),
  Q = require('q');

var saveToDb = function(data, userId, runId) {
  var result = Q.defer();
  var summary;
  data.user = userId;
  data.runId = runId;

  summary = new runsSummary(data);
  summary.save(function (err, savedItem) {
    if (err) {
      console.log('error ' + err);
    }
      else {
        result.resolve(savedItem);
      }
  });
  return result.promise;
};

module.exports = saveToDb;



