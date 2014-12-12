'use strict';

(function() {

  // table of runs
  function TableRunsCtrl(runsSummariesRes, $scope) {

    $scope.runs = runsSummariesRes;

  }

  angular.module('runs').controller('TableRunsCtrl', [ 'runsSummariesRes', '$scope', TableRunsCtrl ]);

}());

