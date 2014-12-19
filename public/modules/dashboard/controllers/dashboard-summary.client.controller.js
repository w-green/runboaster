'use strict';

(function() {

  function DashboardSummCtrl($scope, getSummariesFormattedOneRes) {

    $scope.tableSortable = false;
    $scope.runs = getSummariesFormattedOneRes;

  }

  angular.module('dashboard').controller('DashboardSummCtrl', ['$scope', 'getSummariesFormattedOneRes', DashboardSummCtrl]);

})();


