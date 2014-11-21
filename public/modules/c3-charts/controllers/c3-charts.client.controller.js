'use strict';

(function(d3, c3) {

  var C3ChartsCtrl = function c3ChartsCtrl($scope, runsSummaries) {
    $scope.runs = runsSummaries;
    var runs = [];
    var allRuns = $scope.runs.runs;

    allRuns.forEach(function(run, index, array) {
      var aRun = [];
      aRun.push(run.startTime);
      run.markers.forEach(function(marker) {
        var timeAsString = marker.time;
        var time = d3.time.format('%M.%S')(new Date(timeAsString));

        aRun.push(timeAsString);
      });
      runs.push(aRun);
    });

    var chart = c3.generate({
        bindto: '#c3-chart',
        data: {
          columns:  runs
        },
        grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
        },
        tooltip : {
          format : {
            value :
            function(value) {
              var x;
              x = d3.time.format('%M:%S')(new Date(value));
              return x;
            }
          }
        },
        axis: {
          y: {
            show : true,
            type : 'timeseries',
            ticks : {
              time : {
                value : 'seconds',
                interval : 30
              }
            },
            tick : {
              format : d3.time.format('%Mm %Ss')
            }
          }
        }

      });

      };

  angular.module('c3-charts').controller('C3ChartsCtrl', ['$scope', 'runsSummaries', C3ChartsCtrl]);

}(window.d3, window.c3));