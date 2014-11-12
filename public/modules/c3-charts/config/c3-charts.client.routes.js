'use strict';

// Setting up route
angular.module('c3-charts').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('c3-charts', {
        url: '/my/runs/charts/c3',
        resolve : {
          runsSummaries : ['latestTen', function(latestTen) {
            var res = latestTen.getRuns();
            return res;
          }]
        },
        templateUrl : 'modules/c3-charts/views/c3-line-chart.client.view.html',
        controller : 'C3ChartsCtrl'
      });
  }
]);