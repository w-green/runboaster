'use strict';

// returns a run by id
(function() {

  var getSummariesById = function ($resource, Authentication) {

    var runs = {
      resource :
                $resource('/api/v_' + ApplicationConfiguration.apiVersion +'/:user_id/run/summaries/:summary_id',
                 {'user_id' : '@user_id',
                  'summary_id' : '@summary_id'},
                 {
                    query: { method: 'GET', isArray: true },
                    create: { method: 'POST' }
                  }
                ),
      get : function get(id){
                  var promise = this.resource.query({'user_id' : Authentication.user._id, 'summary_id' : id}).$promise;
                  return promise;
                }
    };
    return runs;

  };


  angular.module('runs').factory('getSummariesById', ['$resource', 'Authentication', getSummariesById]);

}());
