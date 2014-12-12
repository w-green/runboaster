'use strict';

(function() {

  var getSummaries = function getSummaries($resource, Authentication, formatSummaries) {

    var summary = {
      resource :
        $resource(
          '/api/v_' + ApplicationConfiguration.apiVersion +'/:user_id/run/summaries',
          {
            'user_id' : '@user_id'
          }
        ),
        get : function get(options) {

          // if (this.data !== null) {
          //   return this.data;
          // }

          // set default options
          var query = {
            limit : 1,
            offset : 0
          };

          if(options){
            query = {
              limit : options.limit ? options.limit : 1,
              offset : options.offset ? options.offset : 0
            };
          }

          var promise =
            this
              .resource
              .query({
                'user_id' : Authentication.user._id,
                'limit' : query.limit,
                'offset' : query.offset
              }).$promise;

          return promise;
          // this.data = result;
          // return this.data;
        },

        data : null
    };

    return summary;

  };


  angular.module('runs').service('getSummaries', ['$resource', 'Authentication', 'formatSummaries', getSummaries]);

})();