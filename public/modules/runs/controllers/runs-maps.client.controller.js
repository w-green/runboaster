'use strict';

(function(google) {

  if (google === 'undefined') {return;} // google maps is not found

  // Maps controller
  // Used to display google map
  function MyMapsCtrl($scope, getRunRes, getRunById, getSummariesFiveRes, createGmap) {
    var run = getRunRes;
    var mapData = [];
    $scope.gMap = null;
    var summaries = getSummariesFiveRes;


    // ----- Create new map ----- //
    // function createGmap(activityData, summaryMarkerItems)
    mapData[0] = createGmap(run[0].features[0].geometry.coordinates, summaries[0].markerItems);
    $scope.gMap = mapData[0];

    var recreateGmap = function recreateGmap(event, info) {
      if(typeof mapData[info.listOrder] === 'undefined') {
        // getDataById.get('548951ce4c29a6090ce92130').$promise.then(function(newData){
        getRunById.get(info.activityId).then(function(newData){
          mapData[info.listOrder] = createGmap(newData[0].features[0].geometry.coordinates, summaries[info.listOrder].markerItems);
          $scope.gMap = mapData[info.listOrder];
        });
      }
      else {
        $scope.gMap = mapData[info.listOrder];
        $scope.$digest();
      }
    };

    // on a broadcasted event from the summary directive
    // we change the map to the selected activity
    $scope.$on('summarySelected', recreateGmap);


  }

  angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getRunById', 'getSummariesFiveRes', 'createGmap', MyMapsCtrl]);
  // angular.module('runs').controller('MyMapsCtrl', ['$scope', 'getRunRes', 'getRunById', 'getSummariesFiveRes', MyMapsCtrl]);

}(window.google));