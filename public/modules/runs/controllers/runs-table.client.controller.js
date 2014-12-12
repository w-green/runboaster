'use strict';

(function() {

  // table of runs
  function TableRunsCtrl(getSummariesTenRes, $scope) {

    $scope.runs = getSummariesTenRes;

  }

  angular.module('runs').controller('TableRunsCtrl', [ 'getSummariesTenRes', '$scope', TableRunsCtrl ]);

}());

