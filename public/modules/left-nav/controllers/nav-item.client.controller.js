'use strict';

(function() {

  var NavItemController = function NavItemController($scope) {

    $scope.hasIcon = angular.isDefined($scope.icon);

  };

  angular.module('left-nav').controller('NavItemController', [ '$scope', NavItemController]);

})();