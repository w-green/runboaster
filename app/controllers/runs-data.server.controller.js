'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  runsData = mongoose.model('runsData'),
  ObjectId = mongoose.Types.ObjectId,
  Q = require('q'),
  extras = require('../services/runs-data.server.service.js'),
  convert = extras.convert,
  saveData = extras.saveData,
  deleteFile = extras.deleteFile;



/**
 * upload a runs data
 */
exports.create = function(req, res, next) {

  if (req.files.file === undefined) {
    console.error({'message' : 'file non existent'});
    return res.status(400).send();
  }

  var filePath = req.files.file.path;
  var userId = req.user._id; // use the request ID

  convert(filePath) // convert file from gpx to GeoJson
    .then(function(data) {
      var result = saveData(data, userId);
      deleteFile(filePath);
      return result;
    })
    .fail(function(err) {
      console.error(err + err.stack);
      return res.status(400).end();
    })
    .done(function(data) {
      req.runsDataId = data._id;
      next();
    });

};

/**
 * Get users runs
 */
exports.get = function get(req, res) {
  var userId = req.user._id;
  var limit  = req.query.limit || 1;
  var skip = req.query.offset || 0;
  runsData
    .find({'user' : new ObjectId(userId)})
    .sort({'features.properties.time' : -1})
    .skip(skip)
    .limit(limit)
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


/**
 * Get single run
 */
exports.getById = function(req, res) {
  var runId = req.params.run_id;
  runsData
    .find({
      '_id' : new ObjectId(runId)
    })
    .sort({'features.properties.time' : -1})
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

// Remove all runs
 exports.deleteAll = function(req, res) {
  // Check to make sure this function is only executable in test mode
  if (process.env.NODE_ENV !== 'test') {
    return res.status(405)
    .jsonp({
      message: 'This operation can only be used in the test environment'
    });
  }

  runsData.remove({}, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
       res.status(200).end();
    }
  });
 };