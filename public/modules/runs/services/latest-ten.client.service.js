'use strict';


// Using a flyweight pattern to share the latestTen runs btw directives
(function() {

  var latestTen = function ($q, $resource, Authentication) {

    var runs = { // resource object
      resource :
                $resource('/api/v_' + ApplicationConfiguration.apiVersion +'/:user_id/run/summary/lastTen', {'user_id' : '@user_id'}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getRuns : function getRuns(){
                  if (this.data !== null) {
                    return this.data;
                  }
                  var promise = this.resource.query({'user_id' : Authentication.user._id}).$promise;

                  var result = promise.then(function(d) {
                    return createDataOb(d, $q);
                  }); // returns a promise

                  this.data = result;
                  return this.data;
                },
      data :    null
    };
    return runs;

  };


  function createDataOb(runs, $q) {
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
  } //createDataOb

  angular.module('runs').factory('latestTen', ['$q', '$resource', 'Authentication', latestTen]);

}());