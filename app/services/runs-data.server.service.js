'use strict';

var Q = require('q'),
  tj = require('../../lib/togeojson/togeojson.js'),
  fs = require('fs'),
  jsdom = require('jsdom').jsdom, // node doesn't have xml parsing or a dom. use jsdom
  del = require('del'),
  mongoose = require('mongoose'),
  runsData = mongoose.model('runsData');


// converts a file from gpx to GeoJson
exports.convert =
  function convert(filePath) {
    // Using Q for async operation
   return Q.nfcall(fs.readFile, filePath, 'utf8')
      .then(function(result) {
        var gpx = jsdom(result);
        var promiseRun = tj.gpx(gpx);
        return promiseRun;
      });
  };


exports.saveData =
  function saveData(run, userId) {
    var result = Q.defer();
    var runData;
    run.user = userId;
    runData = new runsData(run);
    runData.save(function(err, runData) {
      if (err) {
        throw new Error ('Unable to save this data, check runs-data.server.model.test.js');
      }
        else {
          result.resolve(runData);
        }
    });
    return result.promise;
  };

exports.deleteFile =
  function deleteFile(filePath) {
    del(filePath, function(err) {
      if (err) { throw new Error ('del failed to delete the contents of the uploads folder. Check runs-data.server.model.test.js' + err); }
    });
  };