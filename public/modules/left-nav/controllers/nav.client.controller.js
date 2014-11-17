'use strict';

(function(lodash) {
  var _ = lodash;

  var NavController = function NavController($scope, Authentication) {
    // $scope.authentication is used to determine when to show signout / signin
    $scope.authentication = Authentication;

    setHeight();
    window.onresize = _.debounce(setHeight, 150)
    window.addEventListener('orientationchange', setHeight);

    function setHeight() {
      var navEl = document.getElementById('left-nav-js');
      var htmlEl = document.getElementsByTagName('html')[0];
      var topNav = document.getElementById('top-nav-js');
      var mainContent = document.getElementById('main-content-js');
      var htmlHeight = htmlEl.clientHeight;
      var topNavHeight = topNav.clientHeight;
      var nav_Height =  htmlHeight - topNavHeight;

      navEl.style.height = nav_Height + 'px';
      mainContent.style.height = nav_Height + 'px';
    }

  };

  angular.module('left-nav').controller('NavController', [ '$scope', 'Authentication', NavController]);

}(window._));
