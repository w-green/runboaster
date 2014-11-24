'use strict';

(function(lodash, sorttable) {
  var _ = lodash;

  var runsSummaryTable = function runsSummaryTable($filter) {

    return {

      restrict : 'E',
      link : function(scope, element, attrs) {
        var runs = scope.tableOfRuns.runs;

        // creates placeholder container
        var docFragment = document.createDocumentFragment();

        var tableOfRuns = createTableOfRuns(runs);

        // layout our table.
        function createTableOfRuns(runs) {
          var table = document.createElement('table');
          // note sortable class added for sorttable.js
          table.className = 'table table-striped table-responsive table-hover sortable';
          var thead = document.createElement('thead');
          var headingRow;
          var tableHeadings;
          var tableData;
          var markerSize;

          var headings = {
            date : 'Date',
            markers : 0, // to be overridden after we know no. of total markers
            totalDistance : 'Total Distance',
            totalTime : 'Total Time'
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

            // used for marker heading - to work out total no. of markers
            // default = 0 incase it is not resolved (otherwise it runs to infinity)
            var markers = [];

            // create the headings
            runs.forEach(function(run) {
              // push to markers so we can get the max marker value
              markers.push(run.markerItems.length);
            });
            var markerSize = _.max(markers);
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
            // var container = document.createDocumentFragment();
            runs.forEach(function(run) {
              var tr = document.createElement('tr');

              var tdStartTime = document.createElement('td');

              // use filter to change timestamp to time
              var sTime = $filter('date')(run.startTime, 'EEEE MMM d, y h:mm:ss a');
              tdStartTime.appendChild(document.createTextNode(sTime));

              // use sortable custom key attribute for sorttable.js
              var attTime = $filter('date')(run.startTime, 'yyyyMMddHHmm');
              tdStartTime.setAttribute('sorttable_customkey', attTime);

              tr.appendChild(tdStartTime);

              for (var i = 0; i < markerSize; i++) {
                var td = document.createElement('td');
                var markerTime;
                var data;

                if (run.markerItems[i]) {
                  markerTime = run.markerItems[i].totalTime;
                  data = $filter('date')(markerTime, 'm:ss');
                }
                else {
                  data = '';
                }
                td.appendChild(document.createTextNode(data));
                tr.appendChild(td);
              }

              var tdTotalDist = document.createElement('td');
              var dist = +(run.totalDistanceKm).toFixed(2);
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


        element.append(tableOfRuns);

        // add the sorttable.js initiation
        var table = document.querySelector('table.sortable');
        sorttable.makeSortable(table);
      } // link

    };
  };

angular.module('runs').directive('runsSummaryTable', [ '$filter', runsSummaryTable]);

}(window._, window.sorttable));