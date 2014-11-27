'use strict';

var mapSummaries = function($rootScope) {

  return {
    restrict : 'A',
    link : function postLink(scope, el, attr) {
      el.on('click', function(e) {
        // var activityId = e.target.getAttribute('activity-id');
        var divEl = e.target;
        var activityId = '';
        var listOrder = 0;
        getAttr();

        function getAttr(){

          if(divEl.nodeName !== 'DIV') {
           divEl = e.target.parentNode;
           getAttr();
          }
          else {
           activityId = divEl.getAttribute('data-activity-id') || '';
           listOrder = divEl.getAttribute('data-list-order');
          }
        } // getAttr

        // This will trigger a change of the map to the selected run
        $rootScope.$broadcast('summarySelected', {'activityId' : activityId, 'listOrder' : listOrder});

      });
    }

  }; // returned object

}; // mapSummaries



angular.module('runs').directive('mapSummaries', ['$rootScope', mapSummaries]);