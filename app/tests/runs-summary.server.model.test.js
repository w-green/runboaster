'use strict';

// calculate summaries and save to db - with user id

/**
 * Must be able to retrieve
 *
 * Perfect scenario
 * Mongodb notifies us there is a new runsdata - emit? - can we watch for
 * We retrieve the data from Mongodb
 * We calculate the summary
 * We save the summary.
 *
 * We could emit a message when the data is uploaded - in the return value we include the run id
 * middleware?
 * MIDDLEWARE seems like the best option. It means there is a one time hit but then the data is stored.
 *
 */

// Notification via route - middleware - test that it is the correct data - from mongodb that is returned
// Calculate - dependency on geolib - distance - avg speed per km
// save into db. - need a new schema and model - KISS - look at elevation after
//
// Start with the model - DONE
// I'd like to see the data that we are playing with first
// Lets do the Notification - routes - needs to return runs id
//
//


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    summaryModel = mongoose.model('runsSummary'),
    should = require('should');

var user, runsSummary;

describe('runs summary model tests', function() {
  beforeEach(function(done) {

    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      runsSummary = new summaryModel({
        type: 'run',
        distance: 8,
        time: {minutes : 40, seconds : 35},
        totalAvgPace : {minutes: 5, seconds: 36},
        avgPace: [
          {km : 1, time : {minutes: 1, seconds: 35}},
          {km : 2, time : {minutes: 2, seconds: 35}},
          {km : 3, time : {minutes: 3, seconds: 35}},
          {km : 4, time : {minutes: 4, seconds: 35}},
          {km : 5, time : {minutes: 5, seconds: 35}},
          {km : 6, time : {minutes: 6, seconds: 35}},
          {km : 7, time : {minutes: 7, seconds: 35}},
          {km : 8, time : {minutes: 8, seconds: 35}}
        ],
        user: user
      });

      done();
    });
  });

  it('should save a runs summary', function(done){
    return runsSummary.save(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should be able to show an error when try to save without title', function(done) {
    runsSummary.distance = '';

    return runsSummary.save(function(err) {
      should.exist(err);
      done();
    });
  });

  afterEach(function(done) {
    summaryModel.remove().exec();
    User.remove().exec();
    done();
  });

});





