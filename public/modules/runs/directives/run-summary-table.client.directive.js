'use strict';

(function(lodash, sorttable) {
  var _ = lodash;

  var runsSummaryTable = function runsSummaryTable($rootScope, $filter) {

    return {

      restrict : 'A',
      link : function(scope, element, attrs) {
        var runs = scope.runs;
        var sortable = (scope.tableSortable !== undefined) ? scope.tableSortable : true;

        // Main function to present data in a table.
        // We've exposed on scope for unit tests
        scope.updateTable = function updateTable(runs, sortable) {
          // Makes sure the runs are sorted by date initially
          runs.runs = sortRuns(runs.runs, 'startTime');
          // creates placeholder container
          var docFragment = document.createDocumentFragment();
          var tableOfRuns = createTableOfRuns(runs, sortable);
          var table;

          element.append(tableOfRuns);
          table = document.querySelector('table.sortable') || '';
          // add the sorttable.js initiation
          if(table !== ''){
            sorttable.makeSortable(table);
          }
        }

        scope.updateTable(runs, sortable);

        $rootScope.$on('get next runs', changeTable);

        function changeTable() {
          var origTable = document.getElementById('js-tableOfRuns');
          if(origTable) {
            // remove origTable
            origTable.parentNode.removeChild(origTable);
          }

          scope.updateTable(scope.runs, sortable);
        }

        // Sort runs by start time
        function sortRuns(runsRaw) {
          return _.sortBy(runsRaw, 'startTime').reverse();
        }

        // layout our table.
        function createTableOfRuns(runs, sortable) {
          var table = document.createElement('table');
          // note sortable class added for sorttable.js
          if (sortable) {
            table.className = 'table sortable';
          }
          else {
            table.className = 'table';
          }
          table.id = 'js-tableOfRuns';
          var thead = document.createElement('thead');
          var headingRow;
          var tableHeadings;
          var tableData;
          var markerSize;

          var headings = {
            date : 'Date',
            markers : 0, // to be overridden after we know no. of total markers
            totalDistance : 'Distance',
            totalTime : 'Time'
          };

          // amends headings.markers to get highest number of markers
          getMarkerSize(runs, headings);
          markerSize = headings.markers;

          // headingRow = document.createDocumentFragment();
          headingRow = document.createElement('tr');
          tableHeadings = createTableHeadings(headings, headingRow);

          thead.appendChild(headingRow);
          table.appendChild(thead);

          tableData = createTableData(runs, markerSize, $filter);
          table.appendChild(tableData);

          return table;


          function getMarkerSize(runs, headings) {

            var markerSize = _.max(runs.markerSize);
            headings.markers = markerSize;

          }


          function createTableHeadings(headings, headingRow) {

            for(var heading in headings) {
              if (headings.hasOwnProperty(heading)) {

                var container = document.createDocumentFragment();

                if (heading === 'markers') {
                  var markerSize = headings[heading];

                  for (var i = 1; i <= markerSize; i++) {
                    var thd = document.createElement('th');
                    var km = document.createTextNode('km ' + i);
                    thd.appendChild(km);
                    container.appendChild(thd);
                  }

                }
                else {
                  var thd2 = document.createElement('th');
                  thd2.appendChild(document.createTextNode(headings[heading]));
                  container.appendChild(thd2);
                }

                headingRow.appendChild(container);
              }
            }

            return headingRow;
          }

          function createTableData(runs, markersSize, $filter){
            var markerSize = markersSize;
            var container = document.createElement('tbody');

            runs.runs.forEach(function(run) {
              var tr = document.createElement('tr');

              var tdStartTime = document.createElement('td');

              // use filter to change timestamp to time
              var sTime = $filter('date')(run.startTime, 'EEE MMM d, y h:mma');
              tdStartTime.appendChild(document.createTextNode(sTime));

              // use sortable custom key attribute for sorttable.js
              var attTime = $filter('date')(run.startTime, 'yyyyMMddHHmm');
              tdStartTime.setAttribute('sorttable_customkey', attTime);

              tr.appendChild(tdStartTime);

              for (var i = 0; i < markerSize; i++) {
                var td = document.createElement('td');
                var markerTime;
                var data;

                if (run.markers[i]) {
                  markerTime = run.markers[i].time;
                  data = $filter('date')(markerTime, 'm:ss');
                }
                else {
                  data = '';
                }
                td.appendChild(document.createTextNode(data));
                tr.appendChild(td);
              }

              var tdTotalDist = document.createElement('td');
              var dist = (run.totalDistance).toFixed(2);
              tdTotalDist.appendChild(document.createTextNode(dist));
              tr.appendChild(tdTotalDist);

              var tdTotalTime = document.createElement('td');
              var time = $filter('date')(run.totalTime, 'HH:mm:ss');
              tdTotalTime.appendChild(document.createTextNode(time));
              tr.appendChild(tdTotalTime);

              container.appendChild(tr);
            });
            return container;
          }

        }

      } // link

    };
  };

angular.module('runs').directive('runsSummaryTable', [ '$rootScope', '$filter', runsSummaryTable]);

}(window._, window.sorttable));