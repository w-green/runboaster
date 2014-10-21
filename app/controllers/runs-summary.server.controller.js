'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  runsData = mongoose.model('runsData'),
  summaryModel = mongoose.model('runsSummary'),
  errorHandler = require('./errors'),
  Q = require('q'),
  geolib = require('../../lib/Geolib/dist/geolib.min.js'),
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
    .then(saveToDb, req.user._id);

  return res.status(200).end();

};