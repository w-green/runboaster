'use strict';

(function() {

  var setLeafletMapPolylines = function() {

    return function setMapPolylines(coordinates) {
      var polylines = [];

      coordinates.forEach(function(coords) {

        var newPolyline = [];
        var newCoord;

        coords.map(function(data) {
          newCoord = [data[1], data[0]];
          newPolyline.push(newCoord);
        });

        polylines.push(newPolyline);

      });


      return polylines;
    };

  };

  angular.module('leaflet-maps').factory('setLeafletMapPolylines', [setLeafletMapPolylines]);

})();