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
          post: function postLink(scope, iElement, iAttrs, controller) {
            var mediaQuery = window.matchMedia('(max-width: 768px)');
            var bod = document.querySelector('body');

            // Add active state to nav element that matches new state
            // & remove active class for previous active nav element
            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
              if (fromState.name !== '') {

                // remove the li with active
                if (document.querySelector('.left-nav li.active')) {
                  var prevEl = document.querySelector('.left-nav li.active');
                  prevEl.classList.remove('active');
                }

              }
              // Add active class to li
              if (document.querySelector('#left-nav-js [ui-sref="' + toState.name + '"]')) {
                var newEl = document.querySelector('#left-nav-js [ui-sref="' + toState.name + '"]').parentNode;
                newEl.classList.add('active');
              }

            });

            scope.closeMenu = function closeMenu(event) {
                if (mediaQuery.matches && (event.target.textContent.toLowerCase() !== 'charts')) {
                bod.classList.toggle('leftNav--toggle');
              }
            };

            // toggle menu. When a nav item is selected. For smaller than desktop
            iElement.on('click', scope.closeMenu);



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
      } // compile
    }; // returned object
  }; // sideNav


  angular.module('left-nav').directive('sideNav', ['$location', 'setHeightAftrTopNav', 'mediator', sideNav]);

})();
