(function() {

  'use strict';

  // table of runs
  function TableRunsCtrl(getSummariesCountRes, getSummariesTenRes, $scope) {

    $scope.runs = getSummariesTenRes;
    $scope.runsCount = getSummariesCountRes;

  }

  angular.module('runs').controller('TableRunsCtrl', [ 'getSummariesCountRes', 'getSummariesTenRes', '$scope', TableRunsCtrl]);

}());

