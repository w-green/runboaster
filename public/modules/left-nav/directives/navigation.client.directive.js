(function() {
  var navigation = function navigation($location) {
    return {
      restrict : 'AE',
      transclude : true,
      replace : true,
      template: '<nav><ul data-ng-transclude=""></ul></nav>',
      controller : ['$scope', function($scope) {

      }],
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

          }
        };
      },
    };
  };


  angular.module('left-nav').directive('navigation', ['$location', navigation]);

}());