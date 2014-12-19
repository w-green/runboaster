'use strict';

(function() {

  function DashboardMapCtrl($scope, getRunRes, getSummariesOneRes, createGmap) {
    var run = getRunRes;
    var summaries = getSummariesOneRes;

    // console.log(run[0].features[0].geometry.coordinates);
    // console.log(summaries[0].markerItems);
    $scope.gMap = createGmap(run[0].features[0].geometry.coordinates, summaries[0].markerItems);

    // console.log($scope.gmap);

  }

  angular.module('dashboard').controller('DashboardMapCtrl', ['$scope', 'getRunRes', 'getSummariesOneRes', 'createGmap', DashboardMapCtrl]);

})();


