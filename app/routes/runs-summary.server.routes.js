'use strict';

/**
 * Module dependencies.
 */
var apiVersion = require('../../config/config.js').apiVersion;
var runsSummary = require('../../app/controllers/runs-summary.server.controller');
var users = require('../../app/controllers/users');


module.exports = function(app) {

  app.route('/api/v_' + apiVersion +'/:user_id/run/summaries/:summary_id')
    .get(
      users.requiresLogin,
      runsSummary.getById
    );

  app.route('/api/v_' + apiVersion +'/:user_id/run/summaries')
    .get(
      users.requiresLogin,
      runsSummary.get
    );
};