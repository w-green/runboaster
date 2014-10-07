'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users');

module.exports = function(app) {
  // Article Routes
  //app.route('/my/upload/gpx')
  app.route(/gpx$/)
    .get(users.requiresLogin);
};