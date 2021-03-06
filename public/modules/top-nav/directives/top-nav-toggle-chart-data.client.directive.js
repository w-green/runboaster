'use strict';

(function() {

  var topNavToggleChartData = function topNavToggleChartData() {
    return {
      restrict : 'A',
      link : function postLink(scope, element, attr, ctrl) {
        var dataSelector = element.attr('data-data-selector');
        var chartList;
        var click = element.on('click', toggleMenu);
        var bod = document.querySelector('body');
        var matchMedia = window.matchMedia('min-width: 1200px');
        var toggleDataSelector =
        (function(dataSelectorId) {
          var dataSelector = dataSelectorId;

          return function toggleDataSelector(event) {
            event.preventDefault();
            bod.classList.toggle('dataselector-list-' + dataSelector + '--open');
          };
        })(dataSelector);


        function toggleMenu(event) {
          chartList = document.querySelector('#dataselector-list-js');

          event.preventDefault();
          chartList.classList.toggle('inactive');
          element.toggleClass('open');
        }

        element.on('click', function(event) {
         toggleDataSelector(event);
        });


        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function() {
          click();
          chartList = null;
        });

      } // link
    };

  };

  angular.module('top-nav').directive('topNavToggleChartData', [topNavToggleChartData]);

}());