'use strict';

/**
 * Module dependencies.
 */
var runsSummary = require('../../app/controllers/runs-summary.server.controller');

module.exports = function(app) {
  app.route('/my/runs/')
    .get(runsSummary.listUserRuns);

  app.route('/api/v_1_0_0/:user_id/run/summary/latest')
    .get(runsSummary.getLatest);

};