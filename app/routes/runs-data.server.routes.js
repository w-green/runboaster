'use strict';

/**
 * Module dependencies.
 */
var runsData = require('../../app/controllers/runs-data'),
  runsSummary = require('../../app/controllers/runs-summary'),
  multer = require('multer'),
  users = require('../../app/controllers/users'),
  apiVersion = require('../../config/config.js').apiVersion;

module.exports = function(app) {

  app.route('/api/v_' + apiVersion +'/:user_id/run/data/:run_id')
    .get(
      users.requiresLogin,
      runsData.getById
    );

  app.route('/api/v_' + apiVersion +'/:user_id/run/data')
    .get(
      users.requiresLogin,
      runsData.get
    );

  app.route('/upload')
    .post(
      users.requiresLogin,
      multer({
        onFileUploadStart: function (file) {
          if (file.extension !== 'gpx') {
            return false;
          }
        },
        dest: './uploads/',
        onError: function (error, next) {
          next(error);
        }
      }),
      function (err, req, res, next) {
        if (!err) return next();
        console.error(err.stack);
        res.status(500).render('500', {  error: err.stack});
      },
      runsData.create,
      runsSummary.create
    );
};


