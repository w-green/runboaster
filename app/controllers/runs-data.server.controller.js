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

  if (req.files.file === undefined) {console.error({'message' : 'file non existent'}); return res.status(400).send();}

  var filePath = req.files.file.path,
    userId = req.user._id; // use the request ID
    //runJson = Q.defer(); // converted file

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
 * Get last run
 */
exports.singleRun = function(req, res) {
  var run_user_id = req.params.run_user_id;
  runsData
    .find({'user' : new ObjectId(run_user_id)}, {})
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


/**
 * list all runs data
 */
 exports.list = function(req, res) {
  var query = runsData.find();
  query.exec(function(err, runs) {
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