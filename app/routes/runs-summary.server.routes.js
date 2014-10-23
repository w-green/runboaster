'use strict';

/**
 * Module dependencies.
 */
var runsSummary = require('../../app/controllers/runs-summary.server.controller');

module.exports = function(app) {
  app.route('/my/runs/')
    .get(runsSummary.listUserRuns);

};