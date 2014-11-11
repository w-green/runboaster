'use strict';

(function() {

  var NavGroupController = function NavGroupController($scope) {
    $scope.hasIcon = angular.isDefined($scope.icon);
    $scope.hasSubMenu = angular.isDefined($scope.hasChildren);
  };

  angular.module('left-nav').controller('NavGroupController', [ '$scope', NavGroupController]);

}());
