'use strict';

// Setting up route
angular.module('c3-charts').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('c3-charts', {
        url: '/my/runs/charts/c3',
        resolve : {
          runsSummariesRes : ['getSummaries', 'formatSummaries', function(getSummaries, formatSummaries) {
            var queryOptions = {
              limit : 10
            };
            // format the summs for the charts
            var formattedSumms =
              getSummaries
                .get(queryOptions)
                .then(function(d) {
                  return formatSummaries(d);
                });
            return formattedSumms;
          }]
        },
        templateUrl : 'modules/c3-charts/views/c3-line-chart.client.view.html',
        controller : 'C3ChartsCtrl'
      });
  }
]);