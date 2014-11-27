'use strict';

(function(lodash, google) {

  var _ = lodash;

  if (google === 'undefined') {return;} // google maps is not found

  // Maps controller
  // Used to display google map
  function MyMapsCtrl($scope, singleRunData, getDataById, lastSummary, getActivitySumLatestFiveRes, createGmap) {
    var run = singleRunData;
    var that = this;
    var mapData = [];
    that.gMap = null;
    var summaries = getActivitySumLatestFiveRes;


    // ----- Create new map ----- //
    // function createGmap(activityData, summaryMarkerItems)
    mapData[0] = createGmap(run[0].features[0].geometry.coordinates, lastSummary[0].markerItems);
    that.gMap = mapData[0];

    // on a broadcasted event from the summary directive
    // we change the map to the selected activity
    $scope.$on('summarySelected', function(event, info) {
      if(typeof mapData[info.listOrder] === 'undefined') {
        getDataById.get(info.activityId).$promise.then(function(newData){
          mapData[info.listOrder] = createGmap(newData[0].features[0].geometry.coordinates, summaries[info.listOrder].markerItems);
          that.gMap = mapData[info.listOrder];
        });
      }
      else {
        that.gMap = mapData[info.listOrder];
        $scope.$apply();
      }

    });


  }

  angular.module('runs').controller('MyMapsCtrl', ['$scope', 'singleRunData', 'getDataById', 'lastSummary', 'getActivitySumLatestFiveRes', 'createGmap', MyMapsCtrl]);

}(window._, window.google));