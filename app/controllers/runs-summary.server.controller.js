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
     saveToDb(data, req.user._id);
    })
    .fail(function(err) {
      console.error(err + err.stack);
      return res.status(400).end();
    })
    .done(function(data) {
      return res.status(200).end();
    });

};



/**
 * This should list last 10 runs from user
 */
 exports.listUserRuns = function(req, res) {
  var userId = req.user._id;
  runsSummary
    .find({'user' : new ObjectId(userId)})
    .limit(10)
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
/*
  runsSummary
    .find({ occupation: /host/ })
    .where('name.last').equals('Ghost')
    .where('age').gt(17).lt(66)
    .where('likes').in(['vaporizing', 'talking'])
    .limit(10)
    .sort('-occupation')
    .select('name occupation')
    .exec(callback);
*/


 /* query.exec(function(err, runs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(200).jsonp(runs);
    }
  });
 };*/

/*// Remove a specified run via its id
 exports.deleteId = function(req, res) {
  var run = new Run();
      run._id = req.params.runs_id;

  run.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
       res.status(200).jsonp(run);
    }
  });
 };*/