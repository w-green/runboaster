(function() {

'use strict';

/**
 * @description Watches for new result items and adds them to the DOM
 */

var uploadResults = function uploadResults($compile) {

  return {
    restrict : 'A',
    link : function(scope, element, attrs) {

      function compileMe(toBeCompiled) {
        return $compile(toBeCompiled)(scope);
      }

      scope.$watchCollection('message', function() {

        var num = scope.message.length - 1;
        var newEl = compileMe(scope.message[num]);
        element
          .prepend(newEl);

      });
    } // link
  }; // return

}; // uploadFileName

angular.module('upload-data').directive('uploadResults', ['$compile', uploadResults]);

})();