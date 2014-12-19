'use strict';

(function() {

  function DashboardChartPieCtrl($scope, getSummariesOneRes, getSummariesFormattedOneRes, createChartPie) {

    // var pie = createChartPie(getSummariesOneRes[0].markerItems);
    // var key;
    // getSummariesFormattedTenRes
    $scope.runs = getSummariesFormattedOneRes;


  }

  angular.module('dashboard').controller('DashboardChartPieCtrl', ['$scope', 'getSummariesOneRes', 'getSummariesFormattedOneRes', 'createChartPie', DashboardChartPieCtrl]);

})();





