'use strict';

(function(lodash) {
  var _ = lodash;

  var NavController = function NavController($scope, Authentication) {
    // $scope.authentication is used to determine when to show signout / signin
    $scope.authentication = Authentication;

  };

  angular.module('left-nav').controller('NavController', [ '$scope', 'Authentication', NavController]);

}(window._));
