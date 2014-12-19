'use strict';

(function() {

  function DashboardChartlineCtrl($scope, getRunRes) {

    $scope.run = getRunRes[0].features[0].geometry.coordinates;

  }

  angular.module('dashboard').controller('DashboardChartlineCtrl', ['$scope', 'getRunRes', DashboardChartlineCtrl]);

})();



