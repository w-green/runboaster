'use strict';

(function() {

  var toggleData = function() {
    var allRunsSelect = false;

    return function toggleData(event) {

      // ----- toggles chart lines and background colours in dataselector ----- //
      var e = event;
      var el = angular.element(e.target.parentNode);
      var runNum = el.attr('class').split(' ')[0];

      if (runNum === 'run-all') {
        toggleAllRuns();
      }
      else {
        el.toggleClass('inactive');
        var runClass = 'g.' + runNum;
        var chartRun = document.querySelector(runClass);
        toggleVis(chartRun);
      }

      // toggle visibility of a single chart line
      function toggleVis (chartRun) {
        var el = angular.element(chartRun);
        el.toggleClass('vis-hidden');
      }

      // toggle visibility of all chart lines.
      // Also toggle dataselector background colours for all runs
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
          var selectorListItems = document.querySelectorAll('.dataselector-list li');
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

      } // toggleAllRuns

    }; // return
  }; // var toggleData

  angular.module('charts').factory('toggleData', [toggleData]);

})();
