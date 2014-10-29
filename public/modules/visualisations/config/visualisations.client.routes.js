'use strict';

// Setting up route
angular.module('visualisations').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('vis', {
        url: '/my/runs/linechart',
        templateUrl : 'modules/visualisations/views/vis.client.view.html',
        controller : 'MyVisCtrl'
      });
  }
]);