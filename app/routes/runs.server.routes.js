'use strict';

/**
 * Module dependencies.
 */
var	runs = require('../../app/controllers/runs');

module.exports = function(app) {
	app.route('/runs')
		.get(runs.list)
    .post(runs.create);
    //.delete(runs.deleteId);

  app.route('/runs/:runs_id')
    .delete(runs.deleteId);

  app.route('/runs/all')
    .delete(runs.deleteAll);
};