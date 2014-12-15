'use strict';

(function() {

  var chartDataSelector = function chartDataSelector($window, $filter, addListItem, toggleData, setHeightAftrTopNav, mediator) {

    return {
      restrict : 'AE',
      replace: 'true',
      template:'<div class="dataselector"></div>',
      link : function(scope, elem, attr){
        var data = scope.runs.runs;
        var d3 = $window.d3;

        // The list of runs from which you can select to show on chart
        var chartDataSelectorList  = document.createElement('ul');

        // add Select All item
        var listItemSelectAll = {
          parentListElement : chartDataSelectorList,
          anchorElement : {
            textContent : 'All runs'
          },
          classNm : 'run-all'
        };

        addListItem(listItemSelectAll);

        // Add all of the data selector list items to chartDataSelectorList
        data.forEach(function(d, index, array) {

          var startDate = d3.time.format('%a %b %e %Y')(new Date(d.startTime));
          var selectorListItem = {
            parentListElement : chartDataSelectorList,
            anchorElement : {
              textContent : startDate
            },
            classNm : 'run-' + index + ' inactive'

          };
          addListItem(selectorListItem);

        });

        elem.append(chartDataSelectorList);

        // ----- set the height for scrolling ----- //
        setHeightAftrTopNav(elem[0]);

        elem.on('click', toggleData);

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

  }; // chartDataSelector

  angular.module('charts').directive('chartDataSelector', ['$window', '$filter', 'addListItem', 'toggleData', 'setHeightAftrTopNav', 'mediator', chartDataSelector]);

}());
