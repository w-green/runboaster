'use strict';

(function(lodash, google) {

  var _ = lodash;

  if (google === 'undefined') {return;} // google maps is not found

  // Maps controller
  // Used to display google map
  function MyMapsCtrl(singleRunData, getDataById, lastSummary, createGmap) {
    var run = singleRunData;
    var that = this;
    var mapData = [];
    that.gMap = null;

    // ----- Create new map ----- //
    // function createGmap(runData, summary)
    mapData[1] = createGmap(run[0].features[0].geometry.coordinates, lastSummary[0].markerItems);
    that.gMap = mapData[1];

    // Summary item - which is in the MapSummaryCtrl
    var summaryItem = document.querySelector('div.mapSummaryItem');
    var summaryItemId = summaryItem.getAttribute('data-activity-id');

    summaryItem.addEventListener('click', function(e) {
      var summaryItemId = this.getAttribute('data-activity-id') || '';
      if (summaryItemId === '') {
        return;
      }
      var res = getDataById.get({'run_id' : summaryItemId});
    });


  }

  angular.module('runs').controller('MyMapsCtrl', ['singleRunData', 'getDataById', 'lastSummary', 'createGmap', MyMapsCtrl]);

}(window._, window.google));