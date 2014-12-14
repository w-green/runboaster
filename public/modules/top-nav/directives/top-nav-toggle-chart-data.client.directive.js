'use strict';

(function() {

  var topNavToggleChartData = function topNavToggleChartData() {
    return {
      restrict : 'A',
      link : function postLink(scope, element, attr, ctrl) {

        var chartList;
        element.on('click', toggleMenu);

        function toggleMenu(event) {
          chartList = document.querySelector('#dataselector-list-js');

          event.preventDefault();
          chartList.classList.toggle('inactive');
          element.toggleClass('open');
        }

        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function() {
          element.on('click');
          chartList = null;
        });

      } // link
    };

  };

  angular.module('top-nav').directive('topNavToggleChartData', [topNavToggleChartData]);

}());