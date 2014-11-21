'use strict';

(function() {

  var chartDataSelector = function chartDataSelector($window, $filter) {

    return {

      restrict : 'E',
      template:'<div class="chart--dataselector" data-ng-click="toggleChartData($event)"></div>',
      link : function(scope, elem, attr){
        var data = scope.runs.runs;
        var d3 = $window.d3;

        // Chart data selectors
        var chartDataSelectors = (function(){
          var el = document.querySelector('div.chart--dataselector');
          return angular.element(el);
        })();
        // The list of runs from which you can select to show on chart
        var chartDataSelectorList  = document.createElement('ul');

        addSelectAll();

        function addSelectAll() {
          var li = document.createElement('li');
          var anchor = document.createElement('a');
          anchor.textContent = 'All runs';
          anchor.className = 'run-all';

          li.appendChild(anchor);
          chartDataSelectorList.appendChild(li);
        }


        data.forEach(function(d, index, array) {

          createSelectorList();

          // creates the list of runs to the right of the chart
          // which you select to show on the charts
          function createSelectorList () {

            var li = document.createElement('li');
            li.className = '';
            var anchor = document.createElement('a');
            anchor.className = 'run-' + index;

            var startDate = d3.time.format('%a %b %e %Y')(new Date(d.startTime));
            anchor.textContent = startDate;

            li.appendChild(anchor);
            chartDataSelectorList.appendChild(li);
          } // createSelectorList

        });

        chartDataSelectors.append(chartDataSelectorList);

      } // link
    }; // returned object

  }; // chartDataSelector

  angular.module('charts').directive('chartDataSelector', ['$window', '$filter', chartDataSelector]);

}());
