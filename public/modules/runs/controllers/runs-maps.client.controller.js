'use strict';

(function() {

  // Maps controller
  // Used to display google map
  function MyMapsCtrl($scope, getRunRes, getSummariesFiveRes, leafletData, leafletBoundsHelpers, createGmap) {

    var run = getRunRes;
    var coordinates = run[0].features[0].geometry.coordinates;
    var polylines = [];

    coordinates.forEach(function(coords) {

      var newPolyline = [];
      var newCoord;

      coords.map(function(data) {
        newCoord = [];
        newCoord.push(data[1]);
        newCoord.push(data[0]);
        newPolyline.push(newCoord);
      });

      polylines.push(newPolyline);

    });

    console.log(polylines);

    // console.log(run[0].features[0].geometry.coordinates);

    var mapData = [];
    $scope.gMap = null;
    var summaries = getSummariesFiveRes;


    // ----- Create new map ----- //
    // function createGmap(activityData, summaryMarkerItems)
    mapData[0] = createGmap(run[0].features[0].geometry.coordinates, summaries[0].markerItems);
    $scope.gMap = mapData[0];



    var map = L.map('map', {});

    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy;',
        maxZoom: 18,
        }).addTo(map);


    var markers = [];

    // add the markers
    mapData[0].markers.forEach(function(marker) {

      var coord = [marker.coords.latitude, marker.coords.longitude];
      markers.push(coord);
      L.marker(coord).addTo(map);

    });

    map.fitBounds(markers);
    var polyline = L.multiPolyline(polylines, {color: 'red'}).addTo(map);



  }

  angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getSummariesFiveRes', 'leafletData', 'leafletBoundsHelpers', 'createGmap', MyMapsCtrl]);
  // angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getRunById', 'getSummariesFiveRes', MyMapsCtrl]);

}());

// 'use strict';

// (function(google) {

//   if (google === 'undefined') {return;} // google maps is not found

//   // Maps controller
//   // Used to display google map
//   function MyMapsCtrl($scope, getRunRes, getRunById, getSummariesFiveRes, createGmap) {
//     var run = getRunRes;
//     var mapData = [];
//     $scope.gMap = null;
//     var summaries = getSummariesFiveRes;


//     // ----- Create new map ----- //
//     // function createGmap(activityData, summaryMarkerItems)
//     mapData[0] = createGmap(run[0].features[0].geometry.coordinates, summaries[0].markerItems);
//     $scope.gMap = mapData[0];

//     var recreateGmap = function recreateGmap(event, info) {
//       if(typeof mapData[info.listOrder] === 'undefined') {
//         // getDataById.get('548951ce4c29a6090ce92130').$promise.then(function(newData){
//         getRunById.get(info.activityId).then(function(newData){
//           mapData[info.listOrder] = createGmap(newData[0].features[0].geometry.coordinates, summaries[info.listOrder].markerItems);
//           $scope.gMap = mapData[info.listOrder];
//         });
//       }
//       else {
//         $scope.gMap = mapData[info.listOrder];
//         $scope.$digest();
//       }
//     };

//     // on a broadcasted event from the summary directive
//     // we change the map to the selected activity
//     $scope.$on('summarySelected', recreateGmap);


//   }

//   angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getRunById', 'getSummariesFiveRes', 'createGmap', MyMapsCtrl]);
//   // angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getRunById', 'getSummariesFiveRes', MyMapsCtrl]);

// }(window.google));