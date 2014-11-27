'use strict';

// activityData is used for markers start and end and also for the polylines
// summary is used for markers
var createGmap = function createGmap(setMapPolylines, setMapMarkers) {

  return function (activityData, summaryMarkerItems) {
    var polylines;
    var markers;
    var paths = []; // coords object used by both polylines and markers - for start, end
    var activityStartCoords; // coords used for markers
    var activityEndCoords; // coords used for markers
    var center;
    var zoom = 14;
    var getpolylines;

    getpolylines = setMapPolylines(activityData);
    polylines = getpolylines.polylines;
    paths = getpolylines.paths;


    setStartnEnd(paths.length);

    // sets activityStartCoords and activityEndCoords
    function setStartnEnd(numPaths) {
      var last;
      if(paths[0][0] !== 'undefined') {
        activityStartCoords = paths[0][0];
        if(numPaths !== 'undefined') {
          last = paths[numPaths - 1].length - 1;
          activityEndCoords = paths[numPaths - 1][last];
        }
      }
    }

    markers = setMapMarkers(activityStartCoords, activityEndCoords, summaryMarkerItems);
    center = {latitude: paths[0][0].latitude, longitude: paths[0][0].longitude};

    var gmap = {
      polylines : polylines,
      markers : markers,
      center : center,
      zoom : zoom
    };

    return gmap;
  };

};

angular.module('runs').service('createGmap', ['setMapPolylines', 'setMapMarkers', createGmap]);