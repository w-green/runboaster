'use strict';

// As a factory
(function() {

  var runsService = function ($resource) {

    var al = $resource('/runs/:userId', {userId:'1'});
    return al;

  };

  angular.module('runs').factory('runsService', ['$resource', runsService])

}());





