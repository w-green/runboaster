'use strict';

(function(lodash) {

  var _ = lodash;

  function MapSummaryCtrl(lastSummary, getActivitySumLatestFiveRes, dateFilter) {
    var that = this;
    var latestFive = getActivitySumLatestFiveRes;
    that.summaries = [];

    latestFive.forEach(function(summary, index) {

      var summ = {
        listOrder: index,
        activityId : summary._id,
        date : dateFilter(summary.startTime, 'medium'),
        totalTime : dateFilter(summary.totalTime, "m 'minutes' : s 'seconds'"),
        totalDistanceKm : summary.totalDistanceKm
      };

      that.summaries.push(summ);
    });

  }

  angular.module('runs').controller('MapSummaryCtrl', ['lastSummary', 'getActivitySumLatestFiveRes', 'dateFilter', MapSummaryCtrl]);

}(window._));



