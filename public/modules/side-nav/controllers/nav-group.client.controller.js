'use strict';

(function() {

  var SideNavGroupController = function SideNavGroupController($scope) {
    $scope.hasIcon = angular.isDefined($scope.icon);
    $scope.hasSubMenu = angular.isDefined($scope.hasChildren);
  };

  angular.module('left-nav').controller('SideNavGroupController', [ '$scope', SideNavGroupController]);

}());
