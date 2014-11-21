'use strict';

(function(lodash, google) {

  var _ = lodash;

  if (google === 'undefined') {return;}

  // Maps controller
  // Used to display google map
  function MyMapsCtrl(singleRunData, latestSummary) {
    var run = singleRunData;
    var paths = [];
    var coords;
    var numPaths;
    var polylines = [];
    var Polyline;
    var that = this;
    var runStart;
    var runEnd;

    var i = latestSummary.getLatestSum();

    console.log(i);

    coords = run[0].features[0].geometry.coordinates;
    coords.forEach(function(val, i, arry) {
      if (_.isArray(val)) {
        var newPath = [];
        val.forEach(function(val, i, arry) {
          var latLong = {};
          latLong.latitude = val[1];
          latLong.longitude = val[0];
          newPath.push(latLong);
        });
        paths.push(newPath);
      }
    });


    numPaths = paths.length;
    Polyline = function Polyline(){
      return {
        id : undefined,
        path: undefined,
        stroke : {
          color : '#FF0000',
          weight : 3
        },
        visible: true,
        geodesic: true,
        editable: false,
        draggable: false
      };
    };

    function createPolylines() {
      for(var i = 0; i < numPaths; i++) {
        var newPolyLine = new Polyline();
        newPolyLine.id = i + 1; // start at 1
        newPolyLine.path = paths[i];
        polylines.push(newPolyLine);
      }
    }
    createPolylines();

    // set out the map
    // use the start as the center
    function getStartnEnd(numPaths) {
      var last;
      if(paths[0][0] !== 'undefined') {
        runStart = paths[0][0];
        if(numPaths !== 'undefined') {
          last = paths[numPaths - 1].length - 1;
          runEnd = paths[numPaths - 1][last];
        }
      }
    }

    getStartnEnd(numPaths);

    that.map = {
      center: runStart,
      zoom: 13
    };

    that.polylines = polylines;

    that.markers = [
      {
        id : 0,
        coords : runStart,
        options : {
          labelContent : 'START',
          draggable : true
        }
      },
      {
        id : 1,
        coords : runEnd,
        options : {
          labelContent : 'FINISH',
          draggable : true
        }
      }
    ];

  }

  angular.module('runs').controller('MyMapsCtrl', ['singleRunData', 'latestSummary',  MyMapsCtrl]);

}(window._, window.google));