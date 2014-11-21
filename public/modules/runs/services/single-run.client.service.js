'use strict';


// returns latest run for a user
(function() {

  var singleRun = function ($q, $resource, Authentication) {

    var runs = {
      resource :
                $resource('/runs-data/:run_user_id', {'run_user_id' : '@user_id'}, {
                  query: { method: 'GET', isArray: true },
                  create: { method: 'POST' }
                }),
      getSingleRun : function getRuns(){
                  var promise = this.resource.query({'user_id' : Authentication.user._id});
                  return promise;
                }
    };
    return runs;

  };


  angular.module('runs').factory('singleRun', ['$q', '$resource', 'Authentication', singleRun]);

}());