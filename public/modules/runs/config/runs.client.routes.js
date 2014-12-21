'use strict';

// Setting up route
angular.module('runs').config(['$stateProvider',
  function($stateProvider) {
    // Runs state routing
    $stateProvider
    .state('tableRuns', {
      url : '/runs/table',
      resolve : {
        getSummariesTenRes : ['getSummaries', 'formatSummaries', function(getSummaries, formatSummaries) {
          var queryOptions = {
            limit : 10
          };
          // format the summs for the table directive
          // - directive needs to know number of markers etc
          var formattedSumms =
            getSummaries
              .get(queryOptions)
              .then(function(d) {
                return formatSummaries(d);
              });
          return formattedSumms;
        }]
      },
      templateUrl : 'modules/runs/views/run-table.client.view.html',
      controller : 'TableRunsCtrl'
    })
    .state('mapRuns', {
        url : '/runs/map',
        resolve : {
          getRunRes : ['getRuns', function(getRuns) {
            return getRuns.get();
          }],
          getSummariesFiveRes : ['getSummaries', function(getSummaries) {
            var queryOptions = {
              limit : 5
            };
            return getSummaries.get(queryOptions);
          }]
        },
        views : {

            // the main template will be placed here (relatively named)
            '' : {
              templateUrl: 'modules/runs/views/run.client.view.html'
            },

            // the child views will be defined here (absolutely named)
            'columnOne@mapRuns' : {
              templateUrl : 'modules/runs/views/run-map-summary.client.view.html',
              controller : 'MapSummaryCtrl'
            },

            // 'columnTwo@mapRuns' : {
            //     templateUrl : 'modules/gmap/views/run-map.client.view.html',
            //     controller : 'MyMapsCtrl'
            // }
        }

    });
  }
]);
