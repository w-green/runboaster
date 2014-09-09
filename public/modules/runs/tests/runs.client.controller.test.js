'use strict';

describe('runs controller', function() {
  var scope, ctrl;

  beforeEach(module('runs'));

  beforeEach(inject(function($controller, $rootScope) {

    // Set a new global scope
    scope = $rootScope.$new();

    ctrl = $controller('MyRunsCtrl as runs', {$scope: scope});

  }));



  it('should return the number of runs completed', function(){
    expect(scope.runs.name).toMatch('hello world!!!');
    expect(scope.runs.count).toEqual(3);
    expect(scope.runs.runs[0].time.minutes).toEqual(31);
    expect(scope.runs.runs[2].time.minutes).toEqual(32);
  });




});

