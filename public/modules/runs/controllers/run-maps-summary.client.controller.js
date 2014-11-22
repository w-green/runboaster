'use strict';

(function(lodash) {

  var _ = lodash;

  function MapSummaryCtrl(lastSummary, dateFilter) {
    var that = this;

    that.date = dateFilter(lastSummary[0].startTime, 'medium');
    that.totalTime = dateFilter(lastSummary[0].totalTime, "m 'minutes' : s 'seconds'");
    that.totalDistanceKm = lastSummary[0].totalDistanceKm;

  }

  angular.module('runs').controller('MapSummaryCtrl', ['lastSummary', 'dateFilter', MapSummaryCtrl]);

}(window._));



