'use strict';

/**
 * Module dependencies.
 */
var apiVersion = require('../../config/config.js').apiVersion;
var runsSummary = require('../../app/controllers/runs-summary.server.controller');


module.exports = function(app) {
  app.route('/api/v_' + apiVersion +'/:user_id/run/summary/lastTen')
    .get(runsSummary.listUserRuns);

  app.route('/api/v_' + apiVersion +'/:user_id/run/summary/latest')
    .get(runsSummary.getLatest);

};