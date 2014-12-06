'use strict';

(function() {

  var topNavMenuIcon = function topNavMenuIcon() {
    return {
      restrict : 'A',
      link : function postLink(scope, el, attr, ctrl) {
        var bod = document.querySelector('body');

        el.on('click', toggleMenu);
        function toggleMenu(event) {
          event.preventDefault();
          bod.classList.toggle('leftNav--toggle');
        }
      }
    };

  };

  angular.module('top-nav').directive('topNavMenuIcon', [topNavMenuIcon]);

}());
