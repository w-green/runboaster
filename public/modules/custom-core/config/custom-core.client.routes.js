'use strict';

var routes = function routes($stateProvider) {
  $stateProvider.
    state('about', {
      url : '/about',
      templateUrl : 'modules/custom-core/views/about.client.view.html'
    })
    .state('welcome', {
      url : '/welcome',
      templateUrl : 'modules/custom-core/views/welcome.client.view.html'
    });
};

angular.module('customCore').config(['$stateProvider', routes]);