'use strict';

describe('Top nav menu icon', function() {
  var topNav;
  var angTopNav;

  beforeEach(module('top-nav'));

  beforeEach(inject(function($compile, $rootScope) {
    topNav =
      '<div id="menu-icon-js" data-top-nav-menu-icon class="menu-icon pull-right">' +
        '<span class="fa fa-lg fa-fw fa-bars"></span>' +
      '</div>';
    angTopNav = angular.element(topNav);
    $compile(angTopNav)($rootScope);

    $rootScope.$apply();

  }));

  it('should toggle a class on the body element when selected', inject(function($rootScope){
    var bod;
    bod = document.querySelector('body');

    expect(bod.classList.contains('leftNav--toggle')).toBe(false);
    angTopNav.triggerHandler('click');
    $rootScope.$apply();
    expect(bod.classList.contains('leftNav--toggle')).toBe(true);

  }));

});
