'use strict';

var getActivitySumLatestFive = function getActivitySumLatestFive($resource, Authentication) {

  var summary = {
    resource :
      $resource(
        '/api/v_1_0_0/:user_id/run/summary/latest/five',
        {'user_id' : '@user_id'}
      ),
    get : function getLatestSum() {
        var promise = this.resource.query({'user_id' : Authentication.user._id});
        return promise;
      }

  };

  return summary;
};

angular.module('runs').factory('getActivitySumLatestFive', ['$resource', 'Authentication', getActivitySumLatestFive]);