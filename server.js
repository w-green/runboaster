'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
  cluster = require('cluster');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
// var db = mongoose.connect(config.db, function(err) {
// 	if (err) {
// 		console.error('\x1b[31m', 'Could not connect to MongoDB!');
// 		console.log(err);
// 	}
// });

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});

// Code to run if we're in the master process and if this is not a test env
if (cluster.isMaster && process.env.NODE_ENV !== 'test') {

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }

  // Replace the dead worker,
  cluster.on('exit', function(worker) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });

// Code to run if we're in a worker process
}
else {

  // Init the express application
  var app = require('./config/express')(db);

  // Bootstrap passport config
  require('./config/passport')();

  // Start the app by listening on <port>
  app.listen(config.port);

  // Expose app
  exports = module.exports = app;

  // Logging initialization
  console.log('MEAN.JS application started on port ' + config.port);

  if(process.env.NODE_ENV !== 'test') {
     console.log('Worker ' + cluster.worker.id + ' running!');
  }

}



