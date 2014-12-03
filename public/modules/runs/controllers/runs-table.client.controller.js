'use strict';

(function() {

  // table of runs
  function TableRunsCtrl(runsSummaries, $scope) {
    // var that = this;

    $scope.runs = runsSummaries;

  }

  angular.module('runs').controller('TableRunsCtrl', [ 'runsSummaries', '$scope', TableRunsCtrl ]);

}());

