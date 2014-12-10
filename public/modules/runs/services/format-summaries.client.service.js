'use strict';

(function() {

  var formatSummaries = function($q) {

    return function formatSummaries(runs) {
      var deferred = $q.defer();
      var runsData = {
        runs : [],
        markerSize : [], // no. of markers for each run
        longestMarkerTime : 0,
        shortestMarkerTime : 0
      };

      runs.forEach(function(run) {
        var markersLen;
        var runData = {};
        runData.markers = [];

        markersLen = run.markerItems.length;
        runsData.markerSize.push(markersLen);

        runData.startTime = run.startTime;
        run.markerItems.forEach(function(marker) {
          if(runsData.shortestMarkerTime === 0) {
           runsData.shortestMarkerTime = marker.totalTime;
          } else {
            if(marker.totalTime < runsData.shortestMarkerTime) {
              runsData.shortestMarkerTime = marker.totalTime;
            }
          }
          if (marker.totalTime > runsData.longestMarkerTime) {
            runsData.longestMarkerTime = marker.totalTime;
          }

          var markerData = {
            km : marker.km,
            time : marker.totalTime
          };
          runData.markers.push(markerData);
        });
        runData.totalDistance = run.totalDistanceKm;
        runData.totalTime = run.totalTime;
        runsData.runs.push(runData);
      });

      deferred.resolve(runsData);
      return deferred.promise;
    }; //createDataOb

  };

  angular.module('runs').factory('formatSummaries', ['$q', formatSummaries]);

})();