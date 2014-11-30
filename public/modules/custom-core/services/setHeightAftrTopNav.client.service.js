'use strict';

// Used in navigation, main content, charts dataselector to give
// height to vertical scrolling items

(function() {

  var setHeightAftrTopNav = function setHeightAftrTopNav() {

  return function (elem) {

      var htmlEl;
      var topNav;

      setElHeight(elem);

      function setElHeight(elem) {

        htmlEl = document.querySelector('html');
        topNav = document.getElementById('top-nav-js');
        var htmlHeight = htmlEl.clientHeight;
        var topNavHeight = topNav.clientHeight ? topNav.clientHeight : 50; // default 50px
        var elNewHeight = htmlHeight - topNavHeight;
        elem.style.height = elNewHeight + 'px';

      } //setElHeight

    }; //setHeight

  };

  angular.module('customCore').factory('setHeightAftrTopNav', [setHeightAftrTopNav]);

}());