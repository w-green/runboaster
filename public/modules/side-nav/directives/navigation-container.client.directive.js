'use strict';

(function() {

  var sideNavContainer = function(Authentication) {

    return {
      restrict : 'AE',
      replace : false,
      link : function link(scope, elem, attr) {
        // Only show side nav when signed in
        scope.Authentication = Authentication;
      }
    };

  };


  angular.module('left-nav').directive('sideNavContainer', ['Authentication', sideNavContainer]);

}());