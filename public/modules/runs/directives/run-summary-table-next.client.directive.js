
(function() {

  'use strict';

  var getNextRuns = function getNextRuns($rootScope, getSummaries, formatSummaries) {

    return {

      restrict : 'A',
      scope : {},
      link : function link(scope, elem, attrs) {
        elem.on('click', function getNext() {
          var queryOptions = {
            limit : 10,
            offset : 10
          };
          var formattedSumms =
            getSummaries
              .get(queryOptions)
              .then(function(d) {
                return formatSummaries(d);
              });

          formattedSumms.then(function(data) {
            scope.$parent.runs = data;
            $rootScope.$broadcast('get next runs');
          });

        });
      }
    };

  };

  angular.module('runs').directive('getNextRuns', ['$rootScope', 'getSummaries', 'formatSummaries', getNextRuns]);

}());

