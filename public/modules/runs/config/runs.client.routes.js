'use strict';

// Setting up route
angular.module('runs').config(['$stateProvider',
  function($stateProvider) {
    // Articles state routing
    $stateProvider.
    state('listRuns', {
      url: '/runs',
      templateUrl: 'modules/runs/views/list-runs.client.view.html',
      controller: 'MyRunsCtrl as myRuns'
    })
  }
]);