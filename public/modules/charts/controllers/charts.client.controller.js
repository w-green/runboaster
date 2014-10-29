'use strict';

(function() {

  var chartsCtrl = function chartsCtrl($scope, runsSummaries) {
    $scope.runs = runsSummaries;
    // console.log(runs);

  };

  angular.module('charts').controller('chartsCtrl', ['$scope', 'runsSummaries', chartsCtrl]);

}());