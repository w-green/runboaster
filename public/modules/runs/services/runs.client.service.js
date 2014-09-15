'use strict';


// As a factory
(function() {

  var runsService = function ($resource) {

    var runs = { // resource oject
      resource :
                $resource('/runs', {}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getRuns : function getRuns(callback){
                  var result = null; // cache the return so subsequent requests are dealt with by cache
                  if (result !== null) {callback(result)}
                    else {
                      this.resource
                      .query()
                        .$promise
                        .then(
                          function(data) {
                            result = data;
                            callback(data);
                          },
                          function(error) {
                            console.log('error message - MyRunsCtrl runsService is not working');
                          });
                    }
                }
    };
    return runs;

  };

  angular.module('runs').factory('runsService', ['$resource', runsService])

}());

/*
'use strict';


// As a factory
(function() {

  var runsService = function ($resource) {

    var runs = { // resource oject
      resource :
                $resource('/runs', {}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getRuns : function getRuns(callback){
                  var result = null; // cache the return so subsequent requests are dealt with by cache
                  if (result !== null) {callback(result)}
                    else {
                      this.resource
                      .query()
                        .$promise
                        .then(
                          function(data) {
                            result = data;
                            callback(data);
                          },
                          function(error) {
                            console.log('error message - MyRunsCtrl runsService is not working');
                          });
                    }
                }
    };
    return runs;

  };

  angular.module('runs').factory('runsService', ['$resource', runsService])

}());*/

/*
// As a factory
(function() {

  var runsService = function ($resource) {

    var runs = { // resource oject
      resource :
                $resource('/runs', {}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getRuns : function getRuns(callback){
                  this.resource
                  .query()
                    .$promise
                    .then(
                      function(data) {
                        callback(data);
                        //return data;
                      },
                      function(error) {
                        console.log('error message - MyRunsCtrl runsService is not working');
                      });
                }
    };
    return runs;

  };

  angular.module('runs').factory('runsService', ['$resource', runsService])

}());
*/



/*

// As a factory
(function() {

  var runsService = function ($resource) {
    var runs =
      $resource('/runs', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
      });
    runs.prototype.getRuns = function getRuns(callback){
      runs
        .query()
        .$promise
        .then(
          function(data) {
            callback(data);
            return data;
          },
          function(error) {
            console.log('error message - MyRunsCtrl runsService is not working');
          });
    };
    return runs;
  };

  angular.module('runs').factory('runsService', ['$resource', runsService])

}());*/