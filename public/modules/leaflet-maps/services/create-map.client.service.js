'use strict';

// activityData is used for markers start and end and also for the polylines
// summary is used for markers
var createLeafletMap = function createLeafletMap(setLeafletMapPolylines, setLeafletMapMarkers) {

  return function (activityData, summaryMarkerItems) {

    var polylines;
    var markers;
    var paths = []; // coords object used by both polylines and markers - for start, end
    var activityStartCoords; // coords used for markers
    var activityEndCoords; // coords used for markers
    var zoom = 13;

    polylines = setLeafletMapPolylines(activityData);

    setStartnEnd(polylines.length);

    // sets activityStartCoords and activityEndCoords
    function setStartnEnd(numPaths) {

      var last;

      if(polylines[0][0] !== 'undefined') {
        activityStartCoords = {
          'latitude' : polylines[0][0][0],
          'longitude' : polylines[0][0][1]
        };
        if(numPaths !== 'undefined') {
          last = polylines[numPaths - 1].length - 1;
          activityEndCoords = {
            'latitude' : polylines[numPaths - 1][last][0],
            'longitude' : polylines[numPaths - 1][last][1]
          };
        }
      }

    }

    markers = setLeafletMapMarkers(activityStartCoords, activityEndCoords, summaryMarkerItems);

    var leafletMap = {
      polylines : polylines,
      markers : markers,
      zoom : zoom
    };

    return leafletMap;
  };

};

angular.module('leaflet-maps').factory('createLeafletMap', ['setLeafletMapPolylines', 'setLeafletMapMarkers', createLeafletMap]);