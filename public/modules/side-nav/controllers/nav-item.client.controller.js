'use strict';

(function() {

  var SideNavItemController = function SideNavItemController($scope) {

    $scope.hasIcon = angular.isDefined($scope.icon);

  };

  angular.module('left-nav').controller('SideNavItemController', [ '$scope', SideNavItemController]);

})();