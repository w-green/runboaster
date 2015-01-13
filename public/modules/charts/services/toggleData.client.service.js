'use strict';

(function(lunar) {

  var toggleData = function() {
    var allRunsSelect = false;

    return function toggleData (event) {

      // ----- toggles chart lines and background colours in dataselector ----- //
      var e = event;
      var el = angular.element(e.target.parentNode);
      var runNum = el.attr('class').split(' ')[0];
      var runClass;

      if (runNum === 'run-all') {
        toggleAllRuns();
      }
      else {
        // add active state to dataselector item
        el.toggleClass('inactive');
        runClass = 'g.' + runNum;
        // show path of selected run
        showRunInChart(runClass);
      }

      function showRunInChart(runClass) {
        var path = document.querySelector( runClass + ' path');
        var pathGroup = path.parentNode;
        var isHidden = lunar.hasClass(pathGroup, 'vis-hidden');
        var canIuseSVGAnimation;

        // make hidden and return a
        function toggleHidden(run) {
            lunar.toggleClass(run,'vis-hidden');
        }

        toggleHidden(pathGroup);

        if(!isHidden) {
          return;
        }

        canIuseSVGAnimation = (function() {
          return ('transition' in path.style);
        })();

        if(canIuseSVGAnimation) {
          var PathLength = path.getTotalLength();
          // Clear any previous transition
          path.style.transition = path.style.WebkitTransition = 'none';
          // Set up the starting positions
          path.style.strokeDasharray = PathLength + ' ' + PathLength;
          path.style.strokeDashoffset = PathLength;
          // Trigger a layout so styles are calculated & the browser
          // picks up the starting position before animating
          path.getBoundingClientRect();
          // Define our transition
          path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 2s ease-in-out';
          // Go!
          path.style.strokeDashoffset = '0';
        }

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
          var aListItem;
          var allSelectorsArray = (function() {
            var result = [];
            for (var i = 0; i < selectorListItems.length; i++) {
              result[i] = selectorListItems[i];
            }
            return result;
          })();

          allSelectorsArray.forEach(function(listItem, index, array) {
            aListItem = angular.element(listItem);
            toggleAClass(aListItem, 'inactive');
          });

        } // toggleAllSelectorItems

      } // toggleAllRuns

    }; // return
  }; // var toggleData

  angular.module('charts').factory('toggleData', [toggleData]);

})(window.lunar);
