'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Runs Schema
 */
var RunsSchema = new Schema({
	date : {
		type : Date,
		default : Date.now
	},
	time: {
		minutes : {type: Number},
		seconds : {type: Number}
	}

});

mongoose.model('Runs', RunsSchema);