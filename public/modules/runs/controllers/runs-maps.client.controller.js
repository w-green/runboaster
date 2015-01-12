'use strict';

(function(leaflet) {

  var L = leaflet;

  // Maps controller
  function MyMapsCtrl($rootScope, $scope, $q, getRunRes, getSummariesFiveRes, createLeafletMap, getRunById) {

    var run = getRunRes;
    var coordinates = run[0].features[0].geometry.coordinates;
    var summaries = getSummariesFiveRes;
    var mapData = [];
    $scope.LMap = null;

    // ----- Create new map ----- //
    mapData[0] = createLeafletMap(coordinates, summaries[0].markerItems);

    // sets the map that the Leaflet map directive uses
    $scope.LMap = mapData[0];

    // @returns a new map
    $scope.getNewMap = function getNewMap(id, orderNum) {

      var selectedRun = getRunById.get(id);
      var newMap;
      var deferred = $q.defer();

      selectedRun
        .then(function(run) {
          var selectedRunCoords = run[0].features[0].geometry.coordinates;
          newMap = createLeafletMap(selectedRunCoords, summaries[orderNum].markerItems);
          deferred.resolve(newMap);
        });

      return deferred.promise;
    };

    $scope.changeMap = function changeMap(event, info) {
      if(!mapData[info.listOrder]) {
        $scope.getNewMap(info.activityId, info.listOrder)
          .then(function(map) {
            mapData[info.listOrder] = map;
            $scope.LMap = mapData[info.listOrder];
          });
      }
      else {
        $scope.LMap = mapData[info.listOrder];
        $scope.$digest();
      }
      $rootScope.$digest();

    };

    $scope.$on('summarySelected', $scope.changeMap);


    $scope.$on('destroy', function() {
      mapData = [];
    });


  } // MyMapsCtrl

  angular.module('runs').controller('MyMapsCtrl', ['$rootScope', '$scope', '$q', 'getRunRes', 'getSummariesFiveRes', 'createLeafletMap', 'getRunById', MyMapsCtrl]);

}(window.L));
