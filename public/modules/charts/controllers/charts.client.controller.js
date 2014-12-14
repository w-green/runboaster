'use strict';

(function(lodash) {
  var _ = lodash;

  var chartsCtrl = function chartsCtrl($scope, getSummariesTenRes) {

    var toggleElement;

    $scope.runs = getSummariesTenRes;
    var allRunsSelect = false;

    $scope.toggleChartData = function toggleChartData($event) {
      var e = $event;
      var el = angular.element(e.target.parentNode);
      toggleElement = el[0];

      var runNum = el.attr('class');
      runNum = runNum.split(' ')[0];

      e.preventDefault();
      e.stopPropagation();

      if (runNum === 'run-all') {
        toggleAllRuns();
      }
      else {
        el.toggleClass('inactive');
        var runClass = 'g.' + runNum;
        var chartRun = document.querySelector(runClass);
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
      var toggleAClass;
      allRunsSelect = !allRunsSelect;

      if (allRunsSelect === false) {
        toggleAClass = function(element, classNm) {
          element.addClass(classNm);
        };
      }
      else {
        toggleAClass = function(element, classNm) {
          element.removeClass(classNm);
        };
      }
      toggleGraphRuns();
      toggleAllSelectorItems();

      function toggleGraphRuns() {
        var allRunsArray = (function() {
          var result = [];
          for (var i = 0; i < allRunsNodeList.length; i++) {
            result[i] = allRunsNodeList[i];
          }
          return result;
        })();

        allRunsArray.forEach(function(run, index, array) {
          var aRun = angular.element(run);
          toggleAClass(aRun, 'vis-hidden');
        });
      } // toggleGraphRuns

      function toggleAllSelectorItems(){
        var selectorListItems = document.querySelectorAll('.chart--dataselector li');
        var allSelectorsArray = (function() {
          var result = [];
          for (var i = 0; i < selectorListItems.length; i++) {
            result[i] = selectorListItems[i];
          }
          return result;
        })();

        allSelectorsArray.forEach(function(listItem, index, array) {
          var aListItem = angular.element(listItem);
          toggleAClass(aListItem, 'inactive');
        });

      } // toggleAllSelectorItems

    } //





  };

  angular.module('charts').controller('chartsCtrl', ['$scope', 'getSummariesTenRes', chartsCtrl]);

}(window._));