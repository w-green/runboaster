'use strict';

(function() {

  var topNavMenuIcon = function topNavMenuIcon(Authentication) {
    return {
      restrict : 'A',
      link : function postLink(scope, el, attr, ctrl) {
        var bod = document.querySelector('body');

        scope.authentication = Authentication;

        el.on('click', toggleMenu);
        function toggleMenu(event) {
          event.preventDefault();
          bod.classList.toggle('leftNav--toggle');
        }
      }
    };

  };

  angular.module('top-nav').directive('topNavMenuIcon', ['Authentication', topNavMenuIcon]);

}());
