// directiveFactory
var uploadFileName = function uploadFileName($compile) {

  return {
    restrict : 'A',
    link : function(scope, element, attrs) {

      function compileMe(toBeCompiled) {
        return $compile(toBeCompiled)(scope);
      }

      scope.$watchCollection('message', function() {

        var num = scope.message.length - 1;
        var newEl = compileMe(scope.message[num]);
        var resultsList = document.getElementById('uploadResults');
        angular
          .element(resultsList)
          .prepend(newEl);
      });
    }
  };

};

angular.module('upload-data').directive('uploadFileName', ['$compile', uploadFileName]);