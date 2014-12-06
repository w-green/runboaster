'use strict';

(function() {

  var sideNavItem = function sideNavItem() {
    return {
      require : ['^sideNav'],
      restrict : 'AE',
      replace : true,
      transclude : true,
      controller : 'SideNavItemController',
      scope : {
        title : '@',
        view : '@',
        icon : '@',
        iconCaption : '@',
        href : '@',
        target : '@'
      },
      link : function(scope, element, attrs, parentCtrls) {
        var navCtrl = parentCtrls[0];
        var navgroupCtrl = parentCtrls[1];
      },
      template:
        '<li>' +
          '<a ui-sref="{{ view }}" title="{{ title }}">' +
            '<span data-ng-if="hasIcon" class="icon {{ icon }}"><em data-ng-if="hasIconCaption"> {{ iconCaption }}</em></span>' +
            '<span class="navTitle">{{ title }}</span>' +
            '<span data-ng-transclude=""></span>' +
          '</a>' +
        '</li>'
    };
  };


  angular.module('left-nav').directive('sideNavItem', sideNavItem);

}());