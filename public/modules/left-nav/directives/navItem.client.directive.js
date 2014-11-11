'use strict';

(function() {

  var navItem = function navItem() {
    return {
      require : ['^navigation'],
      restrict : 'AE',
      replace : true,
      transclude : true,
      controller : 'NavItemController',
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
      template: '\
        <li>\
          <a ui-sref="{{ view }}" title="{{ title }}">\
            <span data-ng-if="hasIcon" class="icon {{ icon }}"><em data-ng-if="hasIconCaption"> {{ iconCaption }}</em></span>\
            <span class="navTitle">{{ title }}</span>\
            <span data-ng-transclude=""></span>\
          </a>\
        </li>'
    };
  };


  angular.module('left-nav').directive('navItem', navItem);

}());