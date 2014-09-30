'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  runsData = mongoose.model('runsData'),
  tj = require('togeojson'),
  fs = require('fs'),
  jsdom = require('jsdom').jsdom, // node doesn't have xml parsing or a dom. use jsdom
  rimraf = require('rimraf'); // allows us to delete the upload directory and all files in it

/**
 * upload a runs data
 */
exports.create = function(req, res) {
  if (req.files.fileName === undefined) {return res.status(400).send();}

  var filePath = req.files.fileName.path,
    userId = req.user._id; // use the request ID

  // converts a file from gpx to GeoJson
  function convert(filePath, userId) {
    var reader = fs.readFileSync(filePath, 'utf8'),
      gpx = jsdom(reader),
      runJson = tj.gpx(gpx);
    // Add userId to the data for reference in mongodb
    runJson.user = userId;
    // remove the uploads folder we used to temp store the uploaded file
    rimraf('./uploads', function(err) {
      if (err) { throw new Error ('rimraf failed to delete the uploads folder. Check runs-data.server.model.test.js' + err); }
    });
    return runJson;
  }


  var currentData = new runsData(convert(filePath, userId));

  currentData.save(function(err, currentData) {
    if (err) { throw new Error ('Unable to save this data, check runs-data.server.model.test.js'); }
  });
  return res.status(200).end();

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