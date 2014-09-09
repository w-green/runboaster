'use strict';

// use supertest to check endpoints
var request = require('supertest'),
		should = require('should'),
    expect = require('expect'),
		mongoose = require('mongoose'),
		app = require('../../server');

describe('should test CRUD operations on RUNS', function(done) {

  it('should save a new run as a document', function(){
    request(app)
    .post('/runs')
    .send({'minutes' : 21, 'seconds' : 58})
    .end(function(error, res) {
      expect(res.status).toEqual(200);
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
  it('should delete a specified run', function(done){
    request(app)
    .delete('/runs').end(function(err, res) {
      should.not.exist(err);
      res.status.should.equal(200, res.body.message);
      done();
    });
  });


});




xdescribe('delete all runs for testing', function(done) {
  it('should remove all of the runs', function(done){
    request(app)
    .delete('/runs/all').end(function(err, res) {
      should.not.exist(err);
      res.status.should.equal(200, res.body.message);
      done();
    });
  });
});

