'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  runsData = mongoose.model('runsData'),
  runsSummary = mongoose.model('runsSummary'),
  errorHandler = require('./errors'),
  Q = require('q'),
  geolib = require('../../lib/geolib/geolib.min.js'),
  calculate = require('../services/runs-summary.server.service.js').calculate,
  saveToDb = require('../modules/runs-summary/services/savetodb.js');


exports.create = function(req, res) {
  var query = runsData.where({'_id' : new ObjectId(req.runsDataId)});
  var result = Q.defer();

  query.findOne(function(err, run) {
    if(err) {throw new Error(err + err.stack);}
    result.resolve(run);
  });

  result.promise
    .then(calculate)
    .then(function(data) {
      var deferred = Q.defer();
      var savedSummary;

      save();
      function save() {
        var saveSum = saveToDb(data, req.user._id, req.runsDataId);
        deferred.resolve(saveSum);
      }

      savedSummary = deferred.promise.then(function(data) {
        return data;
      });
      return(savedSummary);
    })
    .fail(function(err) {
      console.error(err + err.stack);
      return res.status(400).end();
    })
    .done(function(data) {
      var runIdNSumId = {};
      if(data) {
        runIdNSumId.runId = data.runId ? data.runId : 0;
        runIdNSumId.SummaryId = data._id ? data._id : 0;
      }
      return res.status(200).send(runIdNSumId).end();
    });

};


/**
 * Get users summaries
 */

exports.get = function get(req, res) {
  var userId = req.params.user_id;
  var limit  = req.query.limit || 1;
  var skip = req.query.offset || 0;
  runsSummary
    .find({'user' : new ObjectId(userId)}, {})
    .sort({'startTime' : -1})
    .skip(skip)
    .limit(limit)
    .exec(function(err, result) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).jsonp(result);
      }
    });
};

/**
 * Get single summary
 */
exports.getById = function(req, res) {
  var summId = req.params.summary_id;
  runsSummary
    .find({
      '_id' : new ObjectId(summId)
    })
    .sort({'startTime' : -1})
    .limit(1)
    .exec(function(err, runs) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).jsonp(runs);
    }
  });
};

/*
 * Get total count for runssummaries
 */
exports.getCount = function(req, res) {
  var userId = req.params.user_id;

  console.log(userId);
  runsSummary
    .count({'user' : new ObjectId(userId)}, function(err, count) {
      if(err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).jsonp(count);
      }
    })
};