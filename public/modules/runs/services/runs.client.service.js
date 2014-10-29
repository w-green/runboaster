'use strict';


// As a factory
// (function() {

  var runsService = function ($resource) {

    var runs = { // resource object
      resource :
                $resource('/my/runs/', {}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getRuns : function getRuns(){
                  if (this.data !== null) {
                    return this.data;
                  }
                  this.data = this.resource.query();
                  return this.data;
                },
      data :    null
    };
    return runs;

  };

  angular.module('runs').factory('runsService', ['$resource', runsService]);

// }());