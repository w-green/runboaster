'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    summaryModel = mongoose.model('runsSummary'),
    should = require('should'),
    summarData = require('../../test-files/output/runs-summary-stub.js');


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
      summarData.user = user;
      runsSummary = new summaryModel(summarData);
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
    runsSummary.startTime = '';

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





