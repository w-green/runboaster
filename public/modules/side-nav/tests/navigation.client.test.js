'use strict';

describe('left navigation : ', function() {
var scope, nav, ctrl, wrapper, wrapper_height, topNav;

  // stub out authentication otherwise an error is thrown
  beforeEach(function() {
    module('left-nav');
    module(function($provide){
      $provide.value('Authentication', {});
/*      $provide.service('setHeightAftrTopNav', function() {
        return function(elem){
        var htmlEl = document.querySelector('html');
        var topNav = document.getElementById('top-nav-js');
        var htmlHeight = htmlEl.clientHeight;
        console.log(htmlHeight);
        var topNavHeight = topNav.clientHeight ? topNav.clientHeight : 50; // default 50px
        var elNewHeight = htmlHeight - topNavHeight;
        elem.style.height = elNewHeight + 'px';
          console.log(elem);
        }
      });*/
    });
  });

  beforeEach(inject(function($controller, $compile, $rootScope) {

    // ----- Setting html height ----- //
    // used for setHeightAftrTopNav() within controller
    // var htmlEl = document.querySelector('html');
    // htmlEl.style.height = '1000px'

    // -----  Setting top nav height  ----- //
    // used for setHeightAftrTopNav() within controller
    topNav = document.createElement('div');
    topNav.id = 'top-nav-js';
    topNav.style.height = '150px';
    document.body.appendChild(topNav);

    // ----- Adding side nav and it's container ----- //
    wrapper = document.createElement('aside');
    wrapper.className = 'left-nav';
    nav = document.createElement('div');
    nav.setAttribute('data-side-nav', '');
    wrapper.appendChild(nav);
    document.body.appendChild(wrapper);


    scope = $rootScope.$new();
    ctrl = $controller('SideNavController', {$scope : scope});

    nav = $compile(nav)(scope);

  }));

  afterEach(function() {
    document.body.removeChild(topNav);
    document.body.removeChild(wrapper);
  });


  it('should compile into nav element', function() {
    var element = nav[0];
    var nodeNom = element.nodeName.toLowerCase();

    expect(nodeNom).toMatch('nav');
  });

  it('should set the height of the nav\'s container', function() {
    var wrapperHeight = wrapper.style.height.substr(0, 4);
    wrapper_height = parseInt(wrapperHeight);

    expect(wrapper_height).toEqual(jasmine.any(Number));
  });

  it('should call the resetHeight function', function() {
    spyOn(scope, 'resetHeight').and.callThrough();
    scope.resetHeight();
    expect(scope.resetHeight).toHaveBeenCalled();
  });



  describe('Nav group : ', function() {
    var navGroup, ctrl;

    beforeEach(inject (function($compile, $controller) {

      navGroup =
        '<side:nav:group data-icon="fa fa-lg fa-fw fa-line-chart" title="Charts" data-has-children="true" data-has-children-icon="fa fa-lg fa-fw fa-angle-left">' +
        '</side:nav:group>';

      navGroup = angular.element(navGroup);
      ctrl = $controller('SideNavGroupController', {$scope : scope});
      navGroup = $compile(navGroup)(scope);
      nav[0].firstChild.appendChild(navGroup[0]);

    }));

    afterEach(function() {
      nav[0].firstChild.removeChild(navGroup[0]);
    });


    it('should compile our nav group', function() {
      var navGroupNode = navGroup[0].nodeName.toLowerCase();
      expect(navGroupNode).toMatch('li');
    });


    describe('Nav item : ', function() {

      var navItem, navItem2;

      beforeEach(inject(function($compile, $controller, $rootScope) {

        navItem = '<side:nav:item data-icon="fa fa-lg fa-fw fa-area-chart" data-view="charts" title="Custom Charts" ></side:nav:item>';
        navItem2 = '<side:nav:item data-icon="fa fa-lg fa-fw fa-table" data-view="table" title="table" ></side:nav:item>';

        navItem = angular.element(navItem);
        navItem2 = angular.element(navItem2);

        nav[0].firstChild.appendChild(navItem[0]);
        nav[0].firstChild.appendChild(navItem2[0]);

        ctrl = $controller('SideNavItemController', {$scope : scope});

        navItem = $compile(navItem)(scope);
        navItem2 = $compile(navItem2)(scope);
        $rootScope.$apply();

      }));

      it('should compile our nav item', function() {
        var navItemNode = navItem[0].nodeName.toLowerCase();

        expect(navItemNode).toMatch(/(li)/);

      });

      // xit('should check state change', inject(function($rootScope) {

      //   scope.$broadcast('$stateChangeSuccess', {name : 'charts'}, '', {name : ''});
      //   $rootScope.$apply();
      //   expect(navItem[0].classList.contains('active')).toBe(true);

      //   scope.$broadcast('$stateChangeSuccess', {name : 'table'}, '', {name : 'charts'});
      //   $rootScope.$apply();
      //   expect(navItem[0].classList.contains('active')).toBe(false);
      //   expect(navItem2[0].classList.contains('active')).toBe(true);

      // })); // it

    }); // describe

  }); // describe

}); // describe
