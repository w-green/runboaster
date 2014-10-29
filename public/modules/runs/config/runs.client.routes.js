'use strict';

// Setting up route
angular.module('runs').config(['$stateProvider',
  function($stateProvider) {
    // Runs state routing
    $stateProvider
    .state('listRuns', {
      url : '/runs',
      resolve : {
        runsSummaries : ['runsService', function(runsService) {
          return runsService.getRuns().$promise;
        }]
      },
      templateUrl : 'modules/runs/views/list-runs.client.view.html',
      controller : 'MyRunsCtrl as myRuns'
    })
    .state('run', {
        url : '/run',
        views : {

            // the main template will be placed here (relatively named)
            '' : { templateUrl: 'modules/runs/views/run.client.view.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@run' : {
              templateUrl: 'modules/runs/views/run-single.client.view.html'
            },

            'columnTwo@run' : {
                templateUrl : 'modules/runs/views/run-map.client.view.html',
                controller : 'MyMapsCtrl as mapsCtrl'
            }
        }

    });
  }
]);
