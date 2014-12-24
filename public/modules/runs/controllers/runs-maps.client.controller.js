'use strict';

(function(leaflet) {

  var L = leaflet;

  // Maps controller
  function MyMapsCtrl($scope, getRunRes, getSummariesFiveRes, leafletData, leafletBoundsHelpers, setLeafletMapPolylines, createLeafletMap, createGmap) {

    var run = getRunRes;
    var coordinates = run[0].features[0].geometry.coordinates;
    var polylines = [];
    var summaries = getSummariesFiveRes;
    var mapData = [];
    var map;
    var markers;
    $scope.gMap = null;

    // var leafletMap = createLeafletMap(coordinates, summaries[0].markerItems);

    polylines = setLeafletMapPolylines(coordinates);

    // ----- Create new map ----- //
    // function createGmap(activityData, summaryMarkerItems)
    mapData[0] = createLeafletMap(coordinates, summaries[0].markerItems);

    // $scope.gMap = mapData[0];

    map = L.map('map', {});

    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy;',
        maxZoom: 18,
        }).addTo(map);


    markers = [];

    // add the markers
    mapData[0].markers.forEach(function(marker) {
      var coord = [marker.coords.latitude, marker.coords.longitude];

      markers.push(coord);
      L.marker(coord).addTo(map);

    });

    map.fitBounds(markers);
    var polyline = L.multiPolyline(polylines, {color: 'red'}).addTo(map);

  } // MyMapsCtrl

  angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getSummariesFiveRes', 'leafletData', 'leafletBoundsHelpers', 'setLeafletMapPolylines', 'createLeafletMap', 'createGmap', MyMapsCtrl]);
  // angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getRunById', 'getSummariesFiveRes', MyMapsCtrl]);

}(window.L));
