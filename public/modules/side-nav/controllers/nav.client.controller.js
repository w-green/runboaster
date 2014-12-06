'use strict';

(function(lodash) {
  var _ = lodash;

  var SideNavController = function SideNavController($scope, Authentication) {
    // $scope.authentication is used to determine when to show signout / signin
    $scope.authentication = Authentication;

  };

  angular.module('left-nav').controller('SideNavController', [ '$scope', 'Authentication', SideNavController]);

}(window._));
