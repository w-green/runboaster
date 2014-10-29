'use strict';

// Setting up route
angular.module('charts').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('charts', {
        url: '/my/runs/charts',
        resolve : {
          runsSummaries : ['runsService', function(runsService) {
            return runsService.getRuns().$promise;
          }]
        },
        templateUrl : 'modules/charts/views/charts.client.view.html',
        controller : 'chartsCtrl'
      });
  }
]);