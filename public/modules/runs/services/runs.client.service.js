'use strict';

(function() {

  var runsService = function($resource) {

    return $resource('/api/entries/:id'); // Note the full endpoint address - hook up using node routers

  };

  runsService.$inject = ['$resource'];

  angular.module('runs').service('runsService', runsService);

}());