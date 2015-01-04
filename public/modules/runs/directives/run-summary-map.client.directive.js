'use strict';

var mapSummaries = function($rootScope) {

  return {
    restrict : 'A',
    link : function postLink(scope, elem, attr) {
      var prevTargetEl;

      scope.changeActiveMap = function changeActiveMap(e) {

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

           if(!prevTargetEl) {
            var firstSumm = divEl.parentNode.querySelector('div.mapSummaryItem');
            prevTargetEl = firstSumm;
           }
           prevTargetEl.classList.remove('active');
           prevTargetEl = divEl;

           divEl.classList.add('active');

          }
        } // getAttr

        // This will trigger a change of the map to the selected run
        $rootScope
          .$broadcast(
            'summarySelected',
            {'activityId' : activityId, 'listOrder' : listOrder}
          );
      };

      // add an event listener to trigger change of map
      elem.on('click', scope.changeActiveMap);


    }

  }; // returned object

}; // mapSummaries



angular.module('runs').directive('mapSummaries', ['$rootScope', mapSummaries]);