'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  runsData = mongoose.model('runsData'),
  Q = require('q'),
  extras = require('../services/runs-data.server.service.js'),
  convert = extras.convert,
  saveData = extras.saveData,
  deleteFile = extras.deleteFile;



/**
 * upload a runs data
 */
exports.create = function(req, res) {

  if (req.files.file === undefined) {console.error({'message' : 'file non existent'}); return res.status(400).send();}

  var filePath = req.files.file.path,
    userId = req.user._id; // use the request ID
    //runJson = Q.defer(); // converted file

  convert(filePath) // convert file from gpx to GeoJson
    .then(function(data) {
      saveData(data, userId);
      deleteFile();
    })
    .then(function() {
      return res.status(200).end();
    })
    .fail(function(err) {
      console.error(err + err.stack)
      return res.status(400).end();
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