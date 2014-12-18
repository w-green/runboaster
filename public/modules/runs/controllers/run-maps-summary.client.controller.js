'use strict';

(function() {

  function MapSummaryCtrl($scope, getSummariesFiveRes, dateFilter) {

    // adding for map dataselector directive
    $scope.summs = getSummariesFiveRes;

    var latestFive = getSummariesFiveRes;

    $scope.summaries = [];
    $scope.setLatestSummaries = setLatestSummaries;

    $scope.setLatestSummaries(latestFive);

    function setLatestSummaries(latestSumms) {
      latestSumms.forEach(function(summary, index) {

        var summ = {
          listOrder: index,
          activityId : summary.runId,
          date : dateFilter(summary.startTime, 'MMM d, y h:mm a'),
          totalTime : dateFilter(summary.totalTime, 'H:m:s'),
          totalDistanceKm : summary.totalDistanceKm.toFixed(2)
        };

        $scope.summaries.push(summ);
      });
    }

  }

  angular.module('runs').controller('MapSummaryCtrl', ['$scope', 'getSummariesFiveRes', 'dateFilter', MapSummaryCtrl]);

}());



