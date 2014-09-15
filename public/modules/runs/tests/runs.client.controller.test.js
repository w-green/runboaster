'use strict';

describe('runs controller', function() {
  var scope, ctrl;

  beforeEach(module('runs'));

  beforeEach(inject(function($controller, $rootScope) {

    // Set a new global scope
    scope = $rootScope.$new();

    ctrl = $controller('MyRunsCtrl as runs', {$scope: scope});

  }));



  xit('should return the number of runs completed', function(){
    //expect(scope.runs.name).toMatch('hello world!!!');
  });




});


