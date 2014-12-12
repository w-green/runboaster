'use strict';


// returns latest run for a user
(function() {

  var getLatestSingleData = function ($q, $resource, Authentication) {

    var runs = {
      resource :
                $resource('/api/v_' + ApplicationConfiguration.apiVersion +'/:user_id/run/data?limit=1',
                 {'user_id' : '@user_id'},
                 {
                    query: { method: 'GET', isArray: true },
                    create: { method: 'POST' }
                  }
                ),
      get : function get(){
                  var promise = this.resource.query({'user_id' : Authentication.user._id});
                  return promise;
                }
    };
    return runs;

  };


  angular.module('runs').factory('getLatestSingleData', ['$q', '$resource', 'Authentication', getLatestSingleData]);

}());
