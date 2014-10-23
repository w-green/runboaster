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
                  return this.resource.query();
                }
/*
      getRuns : function getRuns(callback){
                  var result = null; // cache the return so subsequent requests are dealt with by cache
                  if (result !== null) {callback(result);}
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
*/
    };
    return runs;

  };

  angular.module('runs').factory('runsService', ['$resource', runsService]);

// }());