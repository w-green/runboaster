'use strict';

// runData is used for markers start and end and also for the polylines
// summary is used for markers
var createGmap = function createGmap(setMapPolylines, setMapMarkers) {

  return function (runData, summaryMarkerItems) {
    var polylines;
    var markers;
    var paths = []; // coords object used by both polylines and markers - for start, end
    var runStart; // coords used for markers
    var runEnd; // coords used for markers
    var center;
    var zoom = 14;

    polylines = setMapPolylines(runData).polylines;
    paths = setMapPolylines(runData).paths;


    setStartnEnd(paths.length);

    // sets runStart and runEnd
    function setStartnEnd(numPaths) {
      var last;
      if(paths[0][0] !== 'undefined') {
        runStart = paths[0][0];
        if(numPaths !== 'undefined') {
          last = paths[numPaths - 1].length - 1;
          runEnd = paths[numPaths - 1][last];
        }
      }
    }

    markers = setMapMarkers(runStart, runEnd, summaryMarkerItems);
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