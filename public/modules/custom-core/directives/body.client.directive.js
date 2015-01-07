'use strict';

var body = function body($location, Authentication) {

  return {
    restrict : 'A',
    replace : false,
    link : function link(scope, elem, attr) {
      var aboutRegex;
      var currentUrl;
      scope.aboutState = false;

      scope.authentication = Authentication;
      aboutRegex = new RegExp('/about');

      function checkState() {
        currentUrl = $location.url();
        scope.aboutState = aboutRegex.test(currentUrl);

      }

      scope.$on('$stateChangeSuccess', function() {
        checkState();
      })

    }
  };

};

angular.module('customCore').directive('body', ['$location','Authentication', body]);