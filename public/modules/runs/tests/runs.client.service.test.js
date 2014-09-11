'use strict';

describe('runs service', function() {

  beforeEach(module('runs'));

  it('should query the database for my previous runs', inject(function($http, $httpBackend, runsService){
    var db = runsService;
    var result;

    // set our mock backend
    $httpBackend.when('GET', '/runs/1').respond([
      { '_id' : 1, 'time' : { 'seconds' : 58, 'minutes' : 21 }, 'date' : '2014-07-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 2, 'time' : { 'seconds' : 32, 'minutes' : 21 }, 'date' : '2014-08-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 3, 'time' : { 'seconds' : 45, 'minutes' : 21 }, 'date' : '2014-09-09T13:31:25.292Z', '__v' : 0 }
    ]);


    // store the db query
    result = db.query(function() {
      var run = result[0];
      expect(run instanceof result).toEqual(true);
      expect(result.data.length).toEqual(3);
    });

  }));

});