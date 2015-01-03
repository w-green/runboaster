'use strict';

(function(leaflet) {

  var L = leaflet;

  // Maps controller
  function MyMapsCtrl($scope, getRunRes, getSummariesFiveRes, leafletData, leafletBoundsHelpers, setLeafletMapPolylines, createLeafletMap, createGmap) {

    var run = getRunRes;
    var coordinates = run[0].features[0].geometry.coordinates;
    var summaries = getSummariesFiveRes;
    var mapData = [];
    $scope.LMap = null;

    // ----- Create new map ----- //
    mapData[0] = createLeafletMap(coordinates, summaries[0].markerItems);

    $scope.LMap = mapData[0];

  } // MyMapsCtrl

  angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getSummariesFiveRes', 'leafletData', 'leafletBoundsHelpers', 'setLeafletMapPolylines', 'createLeafletMap', 'createGmap', MyMapsCtrl]);

}(window.L));
