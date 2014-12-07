'use strict';

(function(lodash){
  var _ = lodash;

  var setMapPolylines = function() {
    var polylinePrototype;
    var paths = []; // an array of longitude and latitude objects
    var numPaths;
    var polylines = [];

    // prototype
    polylinePrototype =
      {
        id : -1,
        path: [],
        stroke : {
          color : '#FF0000',
          weight : 3
        },
        visible: true,
        geodesic: true,
        editable: false,
        draggable: false
      };

    // requires paths array - check var declaration for description
    // params coords - an array of coord objects
    function createPaths(coords) {
      coords.forEach(function(val) {
        if (_.isArray(val)) {
          var newPath = [];
          val.forEach(function(val) {
            var latLong = {};
            latLong.latitude = val[1];
            latLong.longitude = val[0];
            newPath.push(latLong);
          });
          paths.push(newPath);
        }
      });
      numPaths = paths.length;
    }

    function setPolyline(options) {
     return angular.extend(Object.create(polylinePrototype), options);
    }

    // requires setPolyline and paths
    function createPolylines() {
      for(var i = 0; i < numPaths; i++) {
        var newPolyLine = {};
        newPolyLine.id = i + 1; // start at 1
        newPolyLine.path = paths[i];
        var polyline = setPolyline(newPolyLine);
        polylines.push(polyline);

      }
    }


    return function setMapPolylines(coords) {
      paths.length = 0; // resetting
      polylines.length = 0;
      createPaths(coords);
      createPolylines();

      return {
        paths : paths,
        polylines : polylines
      };
    };


  };


  angular.module('gmap').factory('setMapPolylines', [setMapPolylines]);

})(window._);