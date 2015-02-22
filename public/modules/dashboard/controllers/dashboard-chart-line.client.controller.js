'use strict';

(function(_) {

  function DashboardChartlineCtrl($scope, getRunRes, getSummariesOneRes) {


    // Add altitude chart
    if(Array.isArray(getRunRes[0].features)) {
      getRunRes[0].features.forEach(function(feature) {
        var runCoords = feature.geometry.coordinates;

        // linestring - only one set of data
        if(typeof runCoords[0][0] === 'number') {
          $scope.run = [runCoords];
        }

        // MultiLine string - multiple sets of data
        else {
          $scope.run = runCoords;
        }

      }); //getRunRes[0].features.forEach
    }

    var summary = {};
    summary.runs = getSummariesOneRes[0];
    summary.runs.longestMarkerTime = function(){
      return _.max(getSummariesOneRes.markerItems.totalTime);
    };

    summary.runs.shortestMarkerTime = function(){
      return _.min(getSummariesOneRes.markerItems.totalTime);
    };

    $scope.summ = summary;

  }

  angular.module('dashboard').controller('DashboardChartlineCtrl', ['$scope', 'getRunRes', 'getSummariesOneRes', DashboardChartlineCtrl]);

})(window._);



