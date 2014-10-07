'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  // note: the agent allows us to preserve a session and cookies for the logged in user
  agent = request.agent(app);


var user;


describe('my routes', function() {

  beforeEach(function(done) {
    // saves a user to the test db.
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

  it('should not let me get to /my/* if not logged in', function(done){
   request(app)
      .get('/my/upload/gpx')
      .end(function (err, res) {
        (res.unauthorized).should.equal(true);
        done();
      });
  });


  afterEach(function(done) {
    User.remove().exec();
    done();
  });


});
