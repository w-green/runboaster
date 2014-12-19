'use strict';

(function() {

  function DashboardSummCtrl($scope, getSummariesOneRes, dateFilter) {

    $scope.summ = getSummariesOneRes[0];
    $scope.summ.startTime = dateFilter($scope.summ.startTime, 'MMM d, y h:mm a');
    $scope.summ.totalTime = dateFilter($scope.summ.totalTime, "H:m:s");


  }

  angular.module('dashboard').controller('DashboardSummCtrl', ['$scope', 'getSummariesOneRes', 'dateFilter', DashboardSummCtrl]);

})();


