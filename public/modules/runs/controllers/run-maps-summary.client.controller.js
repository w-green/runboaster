'use strict';

(function(lodash) {

  var _ = lodash;

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
          date : dateFilter(summary.startTime, 'medium'),
          totalTime : dateFilter(summary.totalTime, "m 'minutes' : s 'seconds'"),
          totalDistanceKm : summary.totalDistanceKm
        };

        $scope.summaries.push(summ);
      });
    }

  }

  angular.module('runs').controller('MapSummaryCtrl', ['$scope', 'getSummariesFiveRes', 'dateFilter', MapSummaryCtrl]);

}(window._));



