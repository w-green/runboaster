'use strict';

(function() {

  var mapDataSelector = function mapDataSelector($window, $rootScope, dateFilter, addListItem, setHeightAftrTopNav, mediator) {

    return {
      restrict : 'AE',
      replace: 'true',
      template:'<div class="dataselector hidden-lg"></div>',
      link : function(scope, elem, attr){
        var data = scope.summs;
        var prevTargetEl;

        // The list of runs from which you can select to show on chart
        var dataSelectorList  = document.createElement('ul');

        // add Select All item
        var listItemSelectRun = {
          parentListElement : dataSelectorList,
          anchorElement : {
            textContent : 'Select a run'
          },
          classNm : 'select-run'
        };

        addListItem(listItemSelectRun);

        // Add all of the data selector list items to chartDataSelectorList
        data.forEach(function(d, index, array) {
          var inactiveClass = index === 0 ? '' : 'inactive';
          var selectorListItem = {
            parentListElement : dataSelectorList,
            anchorElement : {
              textContent : dateFilter(d.startTime, 'medium')
            },
            classNm : inactiveClass,
            attributes : [
              {name : 'data-activity-id', value : d.runId},
              {name : 'data-list-order', value : index}
            ]

          };
          addListItem(selectorListItem);

        });


        elem.append(dataSelectorList);


        elem.on('click', function(e) {
          var targetEl = e.target;
          var activityId = '';
          var listOrder = 0;

          toggleVals(targetEl);
          function toggleVals(targetEl) {
            if(targetEl.nodeName.toLowerCase() !== 'li') {
              toggleVals(targetEl.parentNode);
            }
            else {
            activityId = targetEl.getAttribute('data-activity-id') || '';
            listOrder = targetEl.getAttribute('data-list-order');
            targetEl.classList.toggle('inactive');

            if(!prevTargetEl) {
              // set initial prevTargetEl to first run in list
              prevTargetEl = elem.find('li')[1];

            }

            prevTargetEl.classList.toggle('inactive');
            prevTargetEl = targetEl;

            }
          }

          $rootScope.$broadcast('summarySelected', {'activityId' : activityId, 'listOrder' : listOrder});

        });


        // ----- set the height for scrolling ----- //
        setHeightAftrTopNav(elem[0]);


        // ----- add event listener on window resize ----- //
        var resetHeight = function resetHeight() {
          var element = elem[0];
          setHeightAftrTopNav(element);
        };

        var resizeEvent = mediator.subscribe('windowResize', resetHeight, this);

        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function() {
          mediator.unsubscribe(resizeEvent);
        });

      } // link
    }; // returned object

  }; // mapDataSelector

  angular.module('runs').directive('mapDataSelector', ['$window', '$rootScope', 'dateFilter', 'addListItem', 'setHeightAftrTopNav', 'mediator', mapDataSelector]);

}());