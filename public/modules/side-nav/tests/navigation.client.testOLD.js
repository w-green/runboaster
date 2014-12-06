/*'use strict';

ddescribe('left navigation : ', function() {
var scope, nav, ctrl, wrapper, wrapper_height;

  // stub out authentication otherwise an error is thrown
  beforeEach(function() {
    module('left-nav');
    module(function($provide){
      $provide.value('Authentication', {});
      // $provide.service('setHeightAftrTopNav', function() {
      //   return function(elem){
      //   var htmlEl = document.querySelector('html');
      //   var topNav = document.getElementById('top-nav-js');
      //   var htmlHeight = htmlEl.clientHeight;
      //   console.log(htmlHeight);
      //   var topNavHeight = topNav.clientHeight ? topNav.clientHeight : 50; // default 50px
      //   var elNewHeight = htmlHeight - topNavHeight;
      //   elem.style.height = elNewHeight + 'px';
      //     console.log(elem);
      //   }
      // });
    });
  });

  beforeEach(inject(function($controller, $compile, $rootScope) {

    // ----- Setting html height ----- //
    // used for setHeightAftrTopNav() within controller
    var htmlEl = document.querySelector('html');
    htmlEl.style.height = '1000px'

    // -----  Setting top nav height  ----- //
    // used for setHeightAftrTopNav() within controller
    var topNav = document.createElement('div');
    topNav.id = 'top-nav-js';
    topNav.style.height = '150px';
    document.body.appendChild(topNav);

    // ----- Adding side nav and it's container ----- //
    wrapper = document.createElement('aside');
    nav = document.createElement('div');
    nav.setAttribute('data-side-nav', '');
    wrapper.appendChild(nav);
    document.body.appendChild(wrapper);

    scope = $rootScope.$new();
    ctrl = $controller('SideNavController', {$scope : scope});

    nav = $compile(nav)(scope);

  }));

  it('should compile into nav element', function(){
    var element = nav[0];
    var nodeNom = element.nodeName.toLowerCase();

    expect(nodeNom).toMatch('nav');
  });

  it('should set the height of the nav\'s container', function(){
    var wrapperHeight = wrapper.style.height.substr(0, 4);
    wrapper_height = parseInt(wrapperHeight);

    expect(wrapper_height).toBeGreaterThan(200);
  });

  it('should resize the height the nav\'s container when window is resized', inject(function($rootScope){
      window.resizeTo(1000, 2000);
      $rootScope.$digest();

      var wrapperHeight = wrapper.style.height.substr(0, 4);
      wrapperHeight = parseInt(wrapperHeight);
      expect(wrapperHeight).toBeGreaterThan(wrapper_height);
      wrapper_height = wrapperHeight;
  }));


  describe('Nav group : ', function() {
    var navGroup, ctrl;

    beforeEach(inject (function($compile, $controller) {

      navGroup =
        '<side:nav:group data-icon="fa fa-lg fa-fw fa-line-chart" title="Charts" data-has-children="true" data-has-children-icon="fa fa-lg fa-fw fa-angle-left">' +
        '</side:nav:group>';

      navGroup = angular.element(navGroup);

      ctrl = $controller('SideNavGroupController', {$scope : scope});

      navGroup = $compile(navGroup)(scope);

    }));


    it('should compile our nav group', function(){
      var navGroupNode = navGroup[0].nodeName.toLowerCase();
      expect(navGroupNode).toMatch('li');
    });


    describe('Nav item : ', function() {

      var navItem;

      beforeEach(inject(function($compile, $controller) {

        var completeNav =
        '<div data-side-nav>' +
          '<side:nav:item data-view="home" data-icon="fa fa-lg fa-fw fa-home" title="Dashboard"></side:nav:item>' +
          '<side:nav:group data-icon="fa fa-lg fa-fw fa-line-chart" title="Charts" data-has-children="true" data-has-children-icon="fa fa-lg fa-fw fa-angle-left">' +
            '<side:nav:item data-icon="fa fa-lg fa-fw fa-area-chart" data-view="charts" title="Custom Charts" ></side:nav:item>' +
            '<side:nav:item data-icon="fa fa-lg fa-fw fa-bar-chart" data-view="c3-charts" title="C3.js"></side:nav:item>' +
          '</side:nav:group>' +
        '</div>';

        navItem = completeNav;
        // navItem = '<side:nav:item data-icon="fa fa-lg fa-fw fa-area-chart" data-view="charts" title="Custom Charts" ></side:nav:item>';
        navItem = angular.element(navItem);

        ctrl = $controller('SideNavItemController', {$scope : scope});

        navItem = $compile(navItem)(scope);

      }));


      it('should compile our nav item', function(){

        console.log(navItem);


      });


    });



  });



}); // describe
*/