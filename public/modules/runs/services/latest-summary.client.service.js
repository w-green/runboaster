'use strict';

var latestSummary = function latestSummary($resource, Authentication) {

  var summary = {
    resource :
      $resource(
        '/api/v_1_0_0/:user_id/run/summary/latest',
        {'user_id' : '@user_id'}
      ),
    getLatestSum : function getLatestSum() {
        var promise = this.resource.query({'user_id' : Authentication.user._id});
        return promise;
      }

  };

  return summary;
};

angular.module('runs').factory('latestSummary', ['$resource', 'Authentication', latestSummary]);