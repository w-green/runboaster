'use strict';

/**
 * Module dependencies.
 */
var request = require('supertest'),
		should = require('should'),
    expect = require('expect'),
		app = require('../../server');

/**
 * Unit tests
 */
describe('RUNS model unit tests - CRUD operations', function(done) {

  it('should save a new run as a document', function(){
    request(app)
    .post('/runs')
    .send({'minutes' : 21, 'seconds' : 58})
    .end(function(error, res) {
      res.status.should.equal(200, res.body.message);
    });
  });

  // checking for error message set in runs.server.model.js
  it('should show an error if trying to save a run without times', function(){
    request(app)
    .post('/runs')
    .send({'minutes' : '', 'seconds' : 58})
    .end(function(error, res) {
      res.status.should.equal(400);
      res.body.message.should.match('No minutes have been specified');
    });
  });

  it('should return a list of runs', function(done){
    request(app)
      .get('/runs')
      .end(function(error, res) {
        var result = res.body[0].time.seconds;
        result.should.equal(58); // matcher against test data
        res.status.should.equal(200);
        done();
      });
  });

  // creates a run then uses the ID of that run to remove it
  it('should delete a specified run', function(done){
    request(app)
    .post('/runs')
    .send({'minutes' : 21, 'seconds' : 58})
    .end(function(error, res) {
      var run_id = res.body._id;
      expect(res.status).toEqual(200);
      request(app)
        .delete('/runs/' + run_id).end(function(err, res) {
          should.not.exist(err);
          res.status.should.equal(200, res.body.message);
          done();
        });
    });
  });

  // creates a run then uses the ID of that run to remove it
  it('should show a 404 - page not found - if no run id is specified', function(done){
    request(app)
      .delete('/runs/' + '')
      .end(function(err, res) {
        res.status.should.equal(404);
        done();
      });
  });

  // USEFUL for when testing some cases
  xit('should remove all of the runs from test db', function(done){
    request(app)
    .delete('/runs/all').end(function(err, res) {
      should.not.exist(err);
      res.status.should.equal(200, res.body.message);
      done();
    });
  });

});


