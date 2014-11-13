'use strict';

(function() {

  var TopNavController = function TopNavController($scope) {
    // Register a click handler for menu icon
    var bod = document.getElementById('body-js');
    var menuIcon = document.getElementById('menu-icon-js');
    var AngMenuIcon = angular.element(menuIcon);

    AngMenuIcon.on('click', toggleMenu);
    function toggleMenu(event) {
      event.preventDefault();
      bod.classList.toggle('leftNav--open');
      console.log('yea');
    }
  };

  angular.module('top-nav').controller('TopNavController', ['$scope', TopNavController]);

}());
