(function() {

  var sideNav = function sideNav($location, setHeightAftrTopNav, mediator) {
    return {
      restrict : 'AE',
      transclude : true,
      replace : true,
      template: '<nav><ul data-ng-transclude=""></ul></nav>',
      controller: 'SideNavController',
      compile : function compile(tElement, tAttrs, transclude) {
        return {
          // pre: function preLink(scope, iElement, iAttrs, controller) { ... },
          post: function postLink(scope, iElement, iAttrs, controller) {
            var mediaQuery = window.matchMedia('(max-width: 768px)');
            var bod = document.querySelector('body');

            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
              if (fromState.name !== '') {

                // remove the li with active
                if (document.querySelector('.left-nav li.active')) {
                  var prevEl = document.querySelector('.left-nav li.active');
                  prevEl.classList.remove('active');
                }

              }
              // Add active class to li
              if (document.querySelector('[ui-sref="' + toState.name + '"]')) {
                var newEl = document.querySelector('[ui-sref="' + toState.name + '"]').parentNode;
                newEl.classList.add('active');
              }

              if (mediaQuery.matches) {
                bod.classList.toggle('leftNav--toggle');
              }


            });


            // ----- set the height for scrolling ----- //
            setHeightAftrTopNav(iElement[0].parentElement);

            // ----- add event listener on window resize ----- //
            // adding to scope for testability
            scope.resetHeight = function resetHeight() {
              var element = iElement[0].parentElement;
              setHeightAftrTopNav(element);
            };

            var resizeEvent = mediator.subscribe('windowResize', scope.resetHeight, this);

            // ----- remove event listener when scope is destroyed ----- //
            scope.$on('$destroy', function() {
              mediator.unsubscribe(resizeEvent);
            });


          } // post
        }; // returned object
      }, // compile
    }; // returned object
  }; // sideNav


  angular.module('left-nav').directive('sideNav', ['$location', 'setHeightAftrTopNav', 'mediator', sideNav]);

})();