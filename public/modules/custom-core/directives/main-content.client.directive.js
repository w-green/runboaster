'use strict';

var mainContent = function(mediator, setHeightAftrTopNav) {
  return {
    restrict : 'C',
    link : function(scope, elem, attr) {

      // ----- set the height for scrolling ----- //
      setHeightAftrTopNav(elem[0]);

      // ----- add event listener on window resize ----- //
      // adding to scope for testability
      scope.resetHeight = function resetHeight() {
        setHeightAftrTopNav(elem[0]);
      };

      var resizeEvent = mediator.subscribe('windowResize', scope.resetHeight, this);

      // ----- remove event listener when scope is destroyed ----- //
      scope.$on('$destroy', function() {
        mediator.unsubscribe(resizeEvent);
      });

    }

  };


};

angular.module('customCore').directive('mainContent', ['mediator', 'setHeightAftrTopNav', mainContent]);