'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Run = mongoose.model('Runs');
  // _ = require('lodash');

/**
 * Create a run
 */
exports.create = function(req, res) {
  var run = new Run();
  run.time.minutes = req.body.minutes;
  run.time.seconds = req.body.seconds;

  run.save(function(err, product) {
    if (err) {
      //console.log(err);
      return res.status(400).send({ message : errorHandler.getErrorMessage(err) }) // res.send(err);  //next(err); //res.send(400);
    }else {
    return res.status(200).jsonp(product).end()
    }
  });
};


/**
 * list all runs
 */
 exports.list = function(req, res) {
  var query = Run.find();
  query.exec(function(err, runs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(200).jsonp(runs)
    }
  });
 };

// Remove a specified run via its id
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
 };

// Remove all runs
 exports.deleteAll = function(req, res) {
  // Check to make sure this function is only executable in test mode
  if (process.env.NODE_ENV !== 'test') {
    return res.status(405)
    .jsonp({
      message: 'This operation can only be used in the test environment'
    });
  };

  Run.remove({}, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
       res.status(200).end();
    }
  });
 };