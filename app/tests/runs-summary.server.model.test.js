'use strict';

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





