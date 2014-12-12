'use strict';

angular.module('charts').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('charts', {
        url: '/runs/charts/custom',
        resolve : {
          getSummariesTenRes : ['getSummaries', 'formatSummaries', function(getSummaries, formatSummaries) {
            var queryOptions = {
              limit : 10
            };
            // format the summs for d3
            var formattedSumms =
              getSummaries
                .get(queryOptions)
                .then(function(d) {
                  return formatSummaries(d);
                });
            return formattedSumms;
          }]
        },
        templateUrl : 'modules/charts/views/charts.client.view.html',
        controller : 'chartsCtrl'
      });
  }
]);