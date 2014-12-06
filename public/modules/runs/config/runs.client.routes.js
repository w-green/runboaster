'use strict';

// Setting up route
angular.module('runs').config(['$stateProvider',
  function($stateProvider) {
    // Runs state routing
    $stateProvider
    .state('tableRuns', {
      url : '/runs',
      resolve : {
        runsSummaries : ['latestTen', function(latestTen) {
          var res = latestTen.getRuns(); // returns a promise
          return res;
        }]
      },
      templateUrl : 'modules/runs/views/run-table.client.view.html',
      controller : 'TableRunsCtrl'
    })
    .state('mapRuns', {
        url : '/run',
        resolve : {
          singleRunData : ['getLatestSingleData', function(getLatestSingleData) {
            return getLatestSingleData.get().$promise;
          }],
          lastSummaryRes : ['latestSummary', function(latestSummary) {
            return latestSummary.getLatestSum().$promise;
          }],
          getActivitySumLatestFiveRes : ['getActivitySumLatestFive', function(getActivitySumLatestFive) {
            return getActivitySumLatestFive.get().$promise;
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

            'columnTwo@mapRuns' : {
                templateUrl : 'modules/gmap/views/run-map.client.view.html',
                controller : 'MyMapsCtrl'
            }
        }

    });
  }
]);
