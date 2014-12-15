'use strict';

(function() {

  var chartsCtrl = function chartsCtrl($scope, getSummariesTenRes) {

    $scope.runs = getSummariesTenRes;

  };

  angular.module('charts').controller('chartsCtrl', ['$scope', 'getSummariesTenRes', chartsCtrl]);

}(window._));