'use strict';

(function() {

  var chartsCtrl = function chartsCtrl($scope, runsSummaries) {
    $scope.runs = runsSummaries;
    var allRunsSelect = false;

    $scope.slideOutRuns = function slideOutRuns() {
      var el = document.querySelector('.chart--dataselector-list');
      var angEl = angular.element(el);
      angEl.toggleClass('inactive');
    };

    $scope.toggleChartData = function toggleChartData($event) {
      var e = $event;
      var el = angular.element(e.target);
      var runNum = el.attr('class');

      e.preventDefault();
      e.stopPropagation();

      if (runNum === 'run-all') {
        toggleAllRuns();
      }
      else {
        var chartRun = document.querySelector('.' + runNum);
        toggleVis(chartRun);
      }

    };

    function toggleVis (chartRun) {
      var el = angular.element(chartRun);
      el.toggleClass('vis-hidden');
    }

    // Add event listener to the runs list
    function toggleAllRuns() {
      var allRunsNodeList = document.querySelectorAll('.runLine');
      allRunsSelect = !allRunsSelect;

      var allRunsArray = (function() {
        var result = [];
        for (var i = 0; i < allRunsNodeList.length; i++) {
          result[i] = allRunsNodeList[i];
        }
        return result;
      })();

      allRunsArray.forEach(function(run, index, array) {
        var aRun = angular.element(run);
        if (allRunsSelect === false) {
          aRun.addClass('vis-hidden');
        }
        else {
          aRun.removeClass('vis-hidden');
        }
      });

    } // toggleAllRuns

  };

  angular.module('charts').controller('chartsCtrl', ['$scope', 'runsSummaries', chartsCtrl]);

}());