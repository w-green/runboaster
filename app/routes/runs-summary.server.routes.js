'use strict';

/**
 * Module dependencies.
 */
var apiVersion = require('../../config/config.js').apiVersion;
var runsSummary = require('../../app/controllers/runs-summary.server.controller');
var users = require('../../app/controllers/users');


module.exports = function(app) {
  app.route('/api/v_' + apiVersion +'/:user_id/run/summaries')
    .get(
      users.requiresLogin,
      runsSummary.get
    );

  app.route('/api/v_' + apiVersion +'/:user_id/run/summary/lastTen')
    .get(runsSummary.listUserRuns);

  app.route('/api/v_' + apiVersion +'/:user_id/run/summary/latest/five')
    .get(runsSummary.getLatestFive);

  app.route('/api/v_' + apiVersion +'/:user_id/run/summary/latest')
    .get(runsSummary.getLatest);

};