'use strict';

var request = require('supertest'),
    should = require('should'),
    expect = require('expect'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    summaryModel = mongoose.model('runsSummary'),
    agent = request.agent(app),
    summarData = require('../../test-files/output/runs-summary-stub.js'),
    ObjectId = mongoose.Types.ObjectId;

var user, user__Id;

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
      done();
  });

  it('should return the latest run summary', function(done) {
    summarData.user = user;
    var runsSummary = new summaryModel(summarData);
    runsSummary.save(function(err) {
      if (err) {console.log('failed to save summary ' + err);}
    });

    // save a later run to check this is the one retrieved
    var summaryLatest = summarData;
    summaryLatest._id = new ObjectId('546a77833bba9db643de6344');
    summaryLatest.startTime = new Date();
    summaryLatest = new summaryModel(summaryLatest);
    summaryLatest.save(function(err) {
      if (err) {console.log('failed to save summaryLatest ' + err);}
    });


    agent
      .post('/auth/signin')
      .send(user)
      .end(function(err, res){
        var userId = res.body._id;
        agent
          .get('/api/v_1_0_0/' + userId + '/run/summary/latest')
          .end(function(err, res){
            should(new Date(res.body[0].startTime)).eql(summaryLatest.startTime);

            // remove the summary after use
            summaryModel.remove({'user' : user__Id}).exec();

            done();
          });
      });

  });


  // need to make sure db has 10 runs in it.
  xit('should list the last ten runs', function(done) {

    agent
          .post('/auth/signin')
          .send(user)
          .end(function(err, res){
            expect(res.status).toEqual(200);
            agent
              .get('/my/runs/')
              .set({'user._id' : res.body._id})
              .end(function(err, res) {
                expect(err).toBe(null);
                expect(res.body.length).toEqual(10);
              });
            done();
          });
  });

  afterEach(function(done) {
    User.remove({firstName : 'serverTests'}).exec();
    done();
  });

});

