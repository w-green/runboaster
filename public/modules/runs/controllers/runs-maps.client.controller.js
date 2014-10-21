'use strict';

(function(lodash, google) {

  var _ = lodash;

  if (google === 'undefined') {return;}
  // MyRunsCtrl controller constructor function
  function MyMapsCtrl() {
    var that = this;
    that.name = 'hello world';
    that.map = {
      center: {
          latitude: 51.459545,
          longitude: -0.220431
      },
      zoom: 14
    };

    that.marker = {
      id : 0,
      coords : {
          latitude: 51.459545,
          longitude: -0.220431
      },
      options : { draggable: true},
      label : 'START'
    };


    that.polylines = {
      id : 1,
      path: [
        { latitude: 51.459545, longitude: -0.220431 },
        { latitude : 51.458987, longitude : -0.232163 },
        { latitude : 51.458532, longitude : -0.234770 },
        { latitude : 51.451967, longitude : -0.232989 }
      ],
      stroke : {
        color : '#ff0000',
        weight : 3
      },
      visible: true,
      editable: false,
      draggable: false
    };


    // We want the distance of the polyline

    // Returns an array of LtLng objects for the google maps computeLength()
    var paths = that.polylines.path.map(function(currentVal, index, array) {
      return new google.maps.LatLng( currentVal.latitude, currentVal.longitude );
    });

    that.distance = (function () {
     var meterResult = google.maps.geometry.spherical.computeLength(paths);
     var kilometerResult = metersToKilometers(meterResult);
     return Math.round(100 * kilometerResult) / 100; // rounding to 2 decimal places
    })();

    function metersToKilometers (meters) {
      return (meters / 1000);
    }


  }

  angular.module('runs').controller('MyMapsCtrl', MyMapsCtrl);

}(window._, window.google));

