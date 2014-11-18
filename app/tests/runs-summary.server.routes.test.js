'use strict';

var request = require('supertest'),
    should = require('should'),
    expect = require('expect'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    runsSummary = mongoose.model('runsSummary'),
    runsData = mongoose.model('runsData'),
    agent = request.agent(app),
    summarData = require('../../test-files/output/runs-summary-stub.js');


var user;


xdescribe('getting runs summaries', function() {

  beforeEach(function(done) {
      user = new User({
          firstName: 'Full',
          lastName: 'Name',
          displayName: 'Full Name',
          email: 'test@test.com',
          username: 'username',
          password: 'password',
          provider: 'local'
      });
      user.save();
      done();
  });

  // need to make sure db has 10 runs in it.
  xit('should list the last ten runs', function(done){

    agent
          .post('/auth/signin')
          .send(user)
          .end(function(err, res){
            expect(res.status).toEqual(200);
            agent
              .get('/my/runs/')
              .set({'user._id' : res.body._id})
              .end(function(err, res) {
                console.log(res.req);
                expect(err).toBe(null);
                expect(res.body.length).toEqual(10);
              });
            done();
          });
  });

  afterEach(function(done) {
    runsSummary.remove().exec();
    runsData.remove().exec();
    User.remove().exec();
    done();
  });

});

