'use strict';

var body = function body(Authentication) {

  return {
    restrict : 'A',
    replace : false,
    link : function link(scope, elem, attr) {
      scope.authentication = Authentication;
    }
  };

};

angular.module('customCore').directive('body', ['Authentication', body]);