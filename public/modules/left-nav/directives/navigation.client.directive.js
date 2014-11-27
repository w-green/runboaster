(function(lodash) {

  var _ = lodash;
  var navigation = function navigation($location, setHeightAftrTopNav, mediator) {
    return {
      restrict : 'AE',
      transclude : true,
      replace : true,
      template: '<nav><ul data-ng-transclude=""></ul></nav>',
      controller: 'NavController',
      compile : function compile(tElement, tAttrs, transclude) {
        return {
          // pre: function preLink(scope, iElement, iAttrs, controller) { ... },
          post: function postLink(scope, iElement, iAttrs, controller) {
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

            });


            // ----- set the height for scrolling ----- //
            setHeightAftrTopNav(iElement[0].parentElement);

            // ----- add event listener on window resize ----- //
            var resetHeight = function resetHeight() {
              var element = iElement[0].parentElement;
              setHeightAftrTopNav(element);
            };

            var resizeEvent = mediator.subscribe('windowResize', resetHeight, this);

            // ----- remove event listener when scope is destroyed ----- //
            scope.$on('$destroy', function() {
              mediator.unsubscribe(resizeEvent);
            });


          } // post
        }; // returned object
      }, // compile
    }; // returned object
  }; // navigation


  angular.module('left-nav').directive('navigation', ['$location', 'setHeightAftrTopNav', 'mediator', navigation]);

})(window._);