'use strict';

var request = require('supertest'),
    should = require('should'),
    expect = require('expect'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    runsSummary = mongoose.model('runsSummary'),
    agent = request.agent(app);

// Displays the runs summary data

// e.g. get runs lists last 10 runs
// USE CASES

// As a user a want to see a list of my last 10 runs.
// As a user I want to see a list of my fastest runs.
// As a user I want to see a list of my fastest first km

// As a user I want to see a list of all my runs with paging after 10


/*

ALL OF THE FILE FOR THE TESTS
  .attach('file', './test-files/2014-06-24-1145.gpx')
  .attach('file', './test-files/2014-07-21-1334.gpx')
  .attach('file', './test-files/2014-07-22-1314.gpx')
  .attach('file', './test-files/2014-07-24-1253.gpx')
  .attach('file', './test-files/2014-07-25-1636.gpx')
  .attach('file', './test-files/2014-07-30-1342.gpx')
  .attach('file', './test-files/2014-08-01-0919.gpx')
  .attach('file', './test-files/2014-08-04-1316.gpx')
  .attach('file', './test-files/2014-08-07-2023.gpx')
  .attach('file', './test-files/2014-08-13-2040.gpx')
  .attach('file', './test-files/2014-08-21-1327.gpx')
                  */

var files = [
  './test-files/2014-06-24-1145.gpx',
  './test-files/2014-07-21-1334.gpx',
  './test-files/2014-07-22-1314.gpx',
  './test-files/2014-07-24-1253.gpx',
  './test-files/2014-07-25-1636.gpx',
  './test-files/2014-07-30-1342.gpx',
  './test-files/2014-08-01-0919.gpx',
  './test-files/2014-08-04-1316.gpx',
  './test-files/2014-08-07-2023.gpx',
  './test-files/2014-08-13-2040.gpx',
  './test-files/2014-08-21-1327.gpx'
];

var user;
var uploadRuns;


describe.only('getting runs summaries', function() {

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


/**
 * @description We've uploaded the files in this fashion as it seems the only way to do so.
 * TODO = NEED A WAY OF RUNNING THIS IN THE BEFORE
 * AND THEN TEAR DOWN AFTER
 *
 */
xit('will upload multiple files', function (done) {
    agent
          .post('/auth/signin')
          .send(user)
          .end(function (err, res){
              files.forEach(function(file, index, array) {
                agent
                    .post('/upload')
                    .type('form')
                    .attach('file', file)
                    .expect(200)
                    .end(function (err, res) {
                      if(err) {
                        console.log(err + '  ' + file);
                      }
                    });
              });
              done();
        });
});




  it('should list the last ten runs', function(done){
    agent
          .post('/auth/signin')
          .send(user)
          .end(function(err, res){
            expect(res.status).toEqual(200);
            agent
              .get('/my/runs/')
              .end(function(err, res) {
                expect(err).toBe(null);
                expect(res.body.length).toEqual(10);
              });
            done();
          });
  });

  it('should not allow me to list the last ten runs if I am not signed in', function(){
    // get my/runs/userId
  });

  it('should page for the next ten runs', function(){

  });

});

