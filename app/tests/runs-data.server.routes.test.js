'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    runsData = mongoose.model('runsData'),
    summaryModel = mongoose.model('runsSummary'),
    ObjectId = mongoose.Types.ObjectId,
    agent = request.agent(app),
    apiVersion = require('../../config/config.js').apiVersion;

/**
 * Globals
 */
var user;

// ----- SET UP FUNCTION ----- //
function saveUser(done) {
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
  done();
}


describe('runsData model', function() {

  describe('feature: Upload of runs data', function () {

    beforeEach(function(done){
      saveUser(done);
    });

      it('should not be able to upload a file with diff extension than gpx', function (done) {
        agent
          .post('/auth/signin')
          .send(user)
          .end(function (err, res){
              var userId = res.body._id;
              agent
                .post('/upload')
                .type('form')
                .attach('file', './README.md')
                .end(function (err, res) {
                  expect(res.body.runId).to.be.undefined;
                  done();
                });
          });
      });

      it('should not be able to upload a gpx file if not logged in', function (done) {
        agent
          .post('/upload')
          .type('form')
          .attach('file', './test-files/2014-06-24-1145.gpx')
          .end(function (err, res) {
            expect(res.status).to.equal(401);
            expect(res.unauthorized).to.be.true;
            done();
          });
      });

      it('should be able to upload a gpx file', function (done) {
        agent
          .post('/auth/signin')
          .send(user)
          .end(function (err, res){
            var userId = res.body._id;
            agent
              .post('/upload')
              .type('form')
              .attach('file', './test-files/2014-06-24-1145.gpx')
              .expect(200)
              .end(function (err, res) {
                expect(res.body.runId).to.be.defined;
                expect(res.body.summaryId).to.be.defined;

                // removes data from db
                var user__Id = new ObjectId(user._id);
                runsData.remove({'user' : user__Id}).exec();
                summaryModel.remove({'user' : user__Id}).exec();
                done();
              });
          });
      });

      // The following test has been removed because an error message:
      // Uncaught Error: ENOENT, open ''
      // is thrown by the multer module, which stops the tests.
      xit('should respond with status 400 if file has not been selected', function (done) {
        agent
          .post('/auth/signin')
          .send(user)
          .end(function (err, res){
            var userId = res.body._id;
            agent
              .post('/upload')
              .type('form')
              .attach('file', '')
              .end(function (err, res) {
                agent
                  .get('/api/v_' + apiVersion +'/:user_id/run/data?limit=1')
                  .end(function(error, res) {
                    expect(res.body[0]).to.be.undefined;
                    done();
                  });
              });
          });
      });


      afterEach(function(done) {
        User.remove({firstName : 'serverTests'}).exec();
        done();
      });

  }); // describe

  describe('feature: retrieval of runs data', function() {

    beforeEach(function(done){
      saveUser(done);
    });


    it('should return the latest 2 runs. Checking limit', function (done) {
      var userId;
      agent
        .post('/auth/signin')
        .send(user)
        .end(function (err, res){
          userId = res.body._id;
          agent
            .post('/upload')
            .type('form')
            .attach('file', './test-files/2014-06-24-1145.gpx')
            .expect(200)
            .end(function (err, res) {
              agent
                .post('/upload')
                  .type('form')
                  .attach('file', './test-files/2014-07-21-1334.gpx')
                  .expect(200)
                  .end(function (err, res) {
                    agent
                      // check limit is working
                      .get('/api/v_' + apiVersion +'/:user_id/run/data?limit=2')
                      .end(function(error, res) {
                        (res.body.length).should.equal(2);

                        // removes data from db
                        var user__Id = new ObjectId(user._id);
                        runsData.remove({'user' : user__Id}).exec();
                        summaryModel.remove({'user' : user__Id}).exec();
                        done();
                      });
                  });
            });
        });

    }); // it


    it('should return a run offset by one', function (done) {
      var userId, run_id, run_id_2;

      agent
        .post('/auth/signin')
        .send(user)
        .end(function (err, res){
          userId = res.body._id;
          agent
            .post('/upload')
            .type('form')
            .attach('file', './test-files/2014-06-24-1145.gpx')
            .expect(200)
            .end(function (err, res) {
              run_id = res.body.runId;
              agent
                .post('/upload')
                .type('form')
                .attach('file', './test-files/2014-07-21-1334.gpx')
                .expect(200)
                .end(function (err, res) {
                  run_id_2 = res.body.runId;
                  agent
                    // check offset is working
                    .get('/api/v_' + apiVersion +'/:user_id/run/data?limit=1&offset=1')
                    .end(function(error, res) {
                      (res.body[0]._id).should.match(run_id); // should match the first run

                      // removes data from db
                      var user__Id = new ObjectId(user._id);
                      runsData.remove({'user' : user__Id}).exec();
                      summaryModel.remove({'user' : user__Id}).exec();
                      done();
                    });

                });
            });
        });

    }); // it



    it('should return a run by id', function (done) {
      var userId, run_id, run_id_2;
      agent
        .post('/auth/signin')
        .send(user)
        .end(function (err, res){
          userId = res.body._id;
          agent
            .post('/upload')
            .type('form')
            .attach('file', './test-files/2014-06-24-1145.gpx')
            .expect(200)
            .end(function (err, res) {
              run_id = res.body.runId;
              agent
                .post('/upload')
                .type('form')
                .attach('file', './test-files/2014-07-21-1334.gpx')
                .expect(200)
                .end(function (err, res) {
                  run_id_2 = res.body.runId;
                  (run_id_2).should.not.match(run_id);
                  agent
                    // check getById is working
                    .get('/api/v_' + apiVersion +'/:user_id/run/data/' + run_id)
                    .end(function(error, res) {
                      (res.body.length).should.equal(1);
                      (res.body[0]._id).should.match(run_id);

                      // removes data from db
                      var user__Id = new ObjectId(user._id);
                      runsData.remove({'user' : user__Id}).exec();
                      summaryModel.remove({'user' : user__Id}).exec();
                      done();
                    });
                });
            });
        });

    }); // it

    afterEach(function(done) {
      User.remove({firstName : 'serverTests'}).exec();
      done();
    });

  }); // describe

}); // describe