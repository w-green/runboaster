'use strict';

(function(lodash, google) {

  var _ = lodash;

  if (google === 'undefined') {return;}
  // MyRunsCtrl controller constructor function
  function MyMapsCtrl(singleRunData ) {

    var run = singleRunData;

    var line = [];
    var line2 = [];
    var firstLap = run[0].features[0].geometry.coordinates[0];
    var secondLap = run[0].features[0].geometry.coordinates[1];

    var getPaths = function aPath() {
      firstLap.forEach(function(val, index, arry){
        var latLong = {};
        latLong.latitude = val[1];
        latLong.longitude = val[0];
        line.push(latLong);
      });

      secondLap.forEach(function(val, index, arry){
        var latLong = {};
        latLong.latitude = val[1];
        latLong.longitude = val[0];
        line2.push(latLong);
      });

    };

    getPaths(); // sets lines


    var that = this;

    // use the start as the center

    that.map = {
      center: {
          latitude: 51.459545,
          longitude: -0.220431
      },
      zoom: 13
    };

    that.markers = [
      {
        id : 0,
        coords : {
            latitude: 51.459545,
            longitude: -0.220431
        },
        options : {
          labelContent : 'START',
          draggable : true
        }
      },
      {
        id : 1,
        coords : {
            latitude: 51.451967,
            longitude: -0.232989
        },
        options : {
          labelContent : '1 KM',
          draggable : true
        }
      }
    ];


    that.polylines = [
      {
        id : 1,
        path: line,
        stroke : {
          color : '#FF0000',
          weight : 3
        },
        visible: true,
        editable: false,
        draggable: false
      },
      {
        id : 2,
        path: line2,
        stroke : {
          color : '#00FF00',
          weight : 3
        },
        visible: true,
        editable: false,
        draggable: false
      }
    ];

  }

  angular.module('runs').controller('MyMapsCtrl', ['singleRunData',  MyMapsCtrl]);

}(window._, window.google));