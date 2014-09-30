'use strict';

describe('runs service', function() {

  beforeEach(module('runs'));

  it('should query the database for my previous runs using the RESOURCE object and mock data', inject(function($http, $httpBackend, runsService){
    var db = runsService;
    var result;

    // set our mock backend
    $httpBackend.when('GET', '/runs').respond([
      { '_id' : 1, 'time' : { 'seconds' : 58, 'minutes' : 21 }, 'date' : '2014-07-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 2, 'time' : { 'seconds' : 32, 'minutes' : 21 }, 'date' : '2014-08-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 3, 'time' : { 'seconds' : 45, 'minutes' : 21 }, 'date' : '2014-09-09T13:31:25.292Z', '__v' : 0 }
    ]);

    expect(db).toBeDefined();

    db.resource.query().$promise.then(
      function(data) {
        result = data;
      },
      function(error){
        console.log('ERROR DAMN IT !!!!!!!');
      });
    $httpBackend.flush();
    expect(result.length).toEqual(3);
    expect(result[0].time.seconds).toEqual(58);

  }));

  it('should query the database for my previous runs VIA GETRUNS with mock data', inject(function($http, $httpBackend, runsService){
    var db = runsService;
    var result;

    // set our mock backend
    $httpBackend.when('GET', '/runs').respond([
      { '_id' : 1, 'time' : { 'seconds' : 58, 'minutes' : 21 }, 'date' : '2014-07-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 2, 'time' : { 'seconds' : 32, 'minutes' : 21 }, 'date' : '2014-08-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 3, 'time' : { 'seconds' : 45, 'minutes' : 21 }, 'date' : '2014-09-09T13:31:25.292Z', '__v' : 0 }
    ]);

    expect(db).toBeDefined();
    db.getRuns(function(data){
      result = data;
    });
    $httpBackend.flush();
    expect(result.length).toEqual(3);
    expect(result[1].time.seconds).toEqual(32);


  }));


/*
  it('should query the database for my previous runs VIA GETRUNS with mock data', inject(function($http, $httpBackend, runsService){
    var db = runsService;
    var result;

    // set our mock backend
    $httpBackend.when('GET', '/runs').respond([
      { '_id' : 1, 'time' : { 'seconds' : 58, 'minutes' : 21 }, 'date' : '2014-07-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 2, 'time' : { 'seconds' : 32, 'minutes' : 21 }, 'date' : '2014-08-09T13:31:25.292Z', '__v' : 0 },
      { '_id' : 3, 'time' : { 'seconds' : 45, 'minutes' : 21 }, 'date' : '2014-09-09T13:31:25.292Z', '__v' : 0 }
    ]);

    expect(db).toBeDefined();
    dump(db.prototype.getRuns);
    db.prototype.getRuns(function(data){
      result = data;
      dump(result);

    });
    $httpBackend.flush();
    expect(result.length).toEqual(3);
    expect(result[1].time.seconds).toEqual(32);


  }));*/


});