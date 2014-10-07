// directiveFactory
var uploadFileName = function uploadFileName($compile) {

  return {
    restrict : 'A',
    link : function(scope, element, attrs) {

      function compileMe(toBeCompiled) {
        return $compile(toBeCompiled)(scope);
      }

      scope.$watch('message', function() {
        var newEl = compileMe(scope.message);
        element.parent().after(newEl);
      });

    }


  }

};

angular.module('upload-data').directive('uploadFileName', ['$compile', uploadFileName]);

/*
// directiveFactory
var uploadFileName = function uploadFileName() {

  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      element.bind('change', function() {
        scope.$apply(function() {
          //console.log(element[0].files[0].name);
          scope.fileName = element[0].files[0].name;
        });
      });

    }


  }

};

angular.module('upload-data').directive('uploadFileName', uploadFileName);*/