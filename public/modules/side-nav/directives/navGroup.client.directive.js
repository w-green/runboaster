'use strict';

(function() {

  var sideNavGroup = function sideNavGroup() {
    return {
      restrict : 'AE',
      replace : true,
      transclude : true,
      controller : 'SideNavGroupController',
      scope : {
        title : '@',
        icon : '@',
        iconCaption : '@',
        active : '=?',
        hasChildren : '=?',
        hasChildrenIcon : '@'
      },
      link : function link(scope, element, attrs, parentCtrls) {

        // ----- Set event listener to toggle view for child elements -----//
        var anchor = element.children()[0];
        var angAnchor = angular.element(anchor);
        angAnchor.on('click', function(event) {
          element.toggleClass('open');
        });

      },
      template :
        '<li data-ng-class="{ active : active, hasChildren : hasChildren }">' +
          '<a href="">' +
            '<span data-ng-if="hasIcon" class="icon {{ icon }}"><em data-ng-if="hasIconCaption"> {{ iconCaption }} </em></span>' +
            '<span class="navTitle">{{ title }}</span>' +
            '<span class="icon toggleIcon {{ hasChildrenIcon }}"></span>' +
          '</a>' +
          '<ul data-ng-transclude=""></ul>' +
        '</li>'
    };
  };


  angular.module('left-nav').directive('sideNavGroup', sideNavGroup);

}());

