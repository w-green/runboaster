'use strict';

// Setting up route
angular.module('charts').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('charts', {
        url: '/my/runs/charts',
        resolve : {
          runsSummaries : ['latestTen', function(latestTen) {
            var res = latestTen.getRuns();
            return res;
          }]
        },
        templateUrl : 'modules/charts/views/charts.client.view.html',
        controller : 'chartsCtrl'
      });
  }
]);