'use strict';

// Setting up route
angular.module('runs').config(['$stateProvider',
  function($stateProvider) {
    // Runs state routing
    $stateProvider
    .state('tableRuns', {
      url : '/runs',
      resolve : {
        runsSummaries : ['runsService', function(runsService) {
          return runsService.getRuns().$promise;
        }]
      },
      templateUrl : 'modules/runs/views/list-runs.client.view.html',
      controller : 'MyRunsCtrl as myRuns'
    })
    .state('mapRuns', {
        url : '/run',
        resolve : {
          singleRunData : ['singleRun', function(singleRun) {
            return singleRun.getSingleRun().$promise;
          }],
          lastSummary : ['latestSummary', function(latestSummary) {
            return latestSummary.getLatestSum().$promise;
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
              controller : 'MapSummaryCtrl as MapSummary'
            },

            'columnTwo@mapRuns' : {
                templateUrl : 'modules/runs/views/run-map.client.view.html',
                controller : 'MyMapsCtrl as mapsCtrl'
            }
        }

    });
  }
]);
