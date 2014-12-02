'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    summaryModel = mongoose.model('runsSummary'),
    ObjectId = mongoose.Types.ObjectId,
    should = require('should'),
    summarData = require('../../test-files/output/runs-summary-stub.js');

var user, user__Id, runsSummary;

describe('runs summary model tests', function() {
  beforeEach(function(done) {

    user = new User({
      firstName: 'serverTests',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password',
      provider: 'local'
    });
    user.save(function() {
      summarData.user = user;
      runsSummary = new summaryModel(summarData);
      done();
    });

    user__Id = new ObjectId(user._id);
  });

  it('should save a runs summary', function(done){
    runsSummary.save(function(err) {
      should.not.exist(err);
      summaryModel.remove({'user' : user__Id}).exec();
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
    User.remove({firstName : 'serverTests'}).exec();
    done();
  });

});





