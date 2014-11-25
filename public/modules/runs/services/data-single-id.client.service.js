'use strict';


// returns latest run for a user
(function() {

  var getDataById = function ($resource, Authentication) {

    var runs = {
      resource :
                $resource('/api/v_' + ApplicationConfiguration.apiVersion +'/:user_id/run/data/:run_id',
                 {'user_id' : '@user_id',
                  'run_id' : '@run_id'},
                 {
                    query: { method: 'GET', isArray: true },
                    create: { method: 'POST' }
                  }
                ),
      get : function get(id){
        console.log(id);
                  var promise = this.resource.query({'user_id' : Authentication.user._id, 'run_id' : id});
                  return promise;
                }
    };
    return runs;

  };


  angular.module('runs').factory('getDataById', ['$resource', 'Authentication', getDataById]);

}());
