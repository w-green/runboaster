(function() {

  'use strict';

  var getSummariesCount = function getSummariesCount($http, Authentication) {

    var count = $http.get('/api/v_' + ApplicationConfiguration.apiVersion +'/' + Authentication.user._id + '/run/summaries-count');

    return count;

  };

  angular.module('runs').factory('getSummariesCount', ['$http', 'Authentication', getSummariesCount]);

})();