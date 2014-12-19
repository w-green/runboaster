'use strict';

(function() {

  function DashboardChartPieCtrl($scope, getSummariesOneRes, getSummariesFormattedOneRes, createChartPie) {

    $scope.tableSortable = false;
    $scope.runs = getSummariesFormattedOneRes;

  }

  angular.module('dashboard').controller('DashboardChartPieCtrl', ['$scope', 'getSummariesOneRes', 'getSummariesFormattedOneRes', 'createChartPie', DashboardChartPieCtrl]);

})();





