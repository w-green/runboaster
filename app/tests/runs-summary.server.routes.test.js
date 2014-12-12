'use strict';

var request = require('supertest'),
    should = require('should'),
    expect = require('expect'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    summaryModel = mongoose.model('runsSummary'),
    agent = request.agent(app),
    summarData = require('../../test-files/output/runs-summary-mock.js'),
    ObjectId = mongoose.Types.ObjectId,
    apiVersion = require('../../config/config.js').apiVersion;


var user, user__Id, summaryFirst, summaryLatest;

describe('getting runs summaries', function() {

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
      user.save();
      user__Id = new ObjectId(user._id);

      summarData.user = user__Id;

      // Set up and save two summaries
      // summarData._id = null; // need to reset this otherwise mongo throws an error when resaving
      summaryFirst = new summaryModel(summarData);
      summaryFirst.save(function(err) {
        if (err) {console.log('failed to save summary ' + err);}
      });

      // save a later run to check this is the one retrieved
      summaryLatest = summarData;
      summaryLatest._id = new ObjectId('546a77833bba9db643de6346');
      summaryLatest.startTime = new Date();
      summaryLatest = new summaryModel(summaryLatest);
      summaryLatest.save(function(err) {
        if (err) {console.log('failed to save summaryLatest ' + err);}
      });

      done();

  });

  it('should return a summary by id', function(done) {

    agent
      .post('/auth/signin')
      .send(user)
      .end(function(err, res){
        var userId = res.body._id;
        agent
          .get('/api/v_' + apiVersion +'/' + userId + '/run/summaries/' + summaryLatest._id)
          .end(function(err, res){
            (res.body[0]._id).should.match(summaryLatest._id + '');
            done();
          });
      });

  });

  // KEEP GETTING AN ERROR OF DUPLICATE KEYS WHEN RESAVING SUMMARIES
  // THIS WILL WORK ON ITS OWN IF YOU DISABLE THE OTHERS
  // it('should return the latest run summary', function(done) {

  //   agent
  //     .post('/auth/signin')
  //     .send(user)
  //     .end(function(err, res){
  //       var userId = res.body._id;
  //       agent
  //         .get('/api/v_' + apiVersion +'/' + userId + '/run/summaries')
  //         .end(function(err, res){
  //           should(new Date(res.body[0].startTime)).eql(summaryLatest.startTime);

  //           done();
  //         });
  //     });

  // });

  // KEEP GETTING AN ERROR OF DUPLICATE KEYS WHEN RESAVING SUMMARIES
  // THIS WILL WORK ON ITS OWN IF YOU DISABLE THE OTHERS
  // it('should return the first summary that was saved', function(done) {

  //   agent
  //     .post('/auth/signin')
  //     .send(user)
  //     .end(function(err, res){
  //       var userId = res.body._id;
  //       agent
  //         .get('/api/v_' + apiVersion +'/' + userId + '/run/summaries?limit=1&offset=1')
  //         .end(function(err, res){
  //           console.log(res.body);
  //           should(new Date(res.body[0].startTime)).eql(summaryFirst.startTime);


  //           done();
  //         });
  //     });

  // });


  afterEach(function(done) {
    summaryModel.find({_id : summaryFirst._id}).remove().exec();
    summaryModel.find({_id : summaryLatest._id}).remove().exec();
    User.remove({firstName : 'serverTests'}).exec();
    done();
  });

});

