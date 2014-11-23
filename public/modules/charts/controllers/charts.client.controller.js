'use strict';

(function() {

  var chartsCtrl = function chartsCtrl($scope, runsSummaries) {
    $scope.runs = runsSummaries;
    var allRunsSelect = false;

    $scope.slideOutRuns = function slideOutRuns() {
      var el = document.querySelector('section.chart--dataselector');
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


    window.onresize = _.debounce(setHeight, 150);
    window.addEventListener('orientationchange', setHeight);

    setHeight();
    function setHeight() {
      var htmlEl;
      var topNav;
      var dataSelectorList;

      setDataSelList();

      // Making sure html element has been rendered.
      // If not nav will not show.
      function setDataSelList() {
        dataSelectorList = document.querySelector('.chart--dataselector-list') || '';
        var timer = setTimeout(setDataSelList, 10);
        if(dataSelectorList === ''){
          timer;
        }
        else {
          clearTimeout(timer);
          return;
        }
      }

      htmlEl = document.querySelector('html');
      topNav = document.getElementById('top-nav-js') || '';
      var htmlHeight = htmlEl.clientHeight;
      var topNavHeight = topNav.clientHeight;
      var dataSelectorList_Height =  htmlHeight - topNavHeight;


      dataSelectorList.style.height = dataSelectorList_Height + 'px';
    }


  };

  angular.module('charts').controller('chartsCtrl', ['$scope', 'runsSummaries', chartsCtrl]);

}());