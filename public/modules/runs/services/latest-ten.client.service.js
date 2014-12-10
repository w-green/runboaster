'use strict';

(function() {

  var latestTen = function ($resource, Authentication, formatSummaries) {

    var runs = { // resource object
      resource :
                $resource('/api/v_' + ApplicationConfiguration.apiVersion +'/:user_id/run/summary/lastTen', {'user_id' : '@user_id'}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getRuns : function getRuns(){
                  // if (this.data !== null) {
                  //   return this.data;
                  // }
                  var promise = this.resource.query({'user_id' : Authentication.user._id}).$promise;

                  var result = promise.then(function(d) {
                    return formatSummaries(d);
                  }); // returns a promise

                  this.data = result;
                  return this.data;
                },
      data :    null
    };
    return runs;

  };

  angular.module('runs').factory('latestTen', ['$resource', 'Authentication', 'formatSummaries', latestTen]);

}());