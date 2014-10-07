// directiveFactory
var uploadFileName = function uploadFileName($compile) {

  return {
    restrict : 'A',
    link : function(scope, element, attrs) {

      function compileMe(toBeCompiled) {
        return $compile(toBeCompiled)(scope);
      }

      scope.$watchCollection('message', function() {
        // console.log(scope.message);

        var str = scope.message.join('<br />');

        var newEl = compileMe(str);
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