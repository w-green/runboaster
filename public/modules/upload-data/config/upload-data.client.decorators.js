'use strict';

/*
 * Decorator for Angular File Upload service
 * Adds functionality to check the suffix of a file
 * $upload: a service from Angular file upload,
 * $delegate: the original service (in this case $upload) which is returned
 *  with the added functionality
 */
angular.module('upload-data').config(['$provide',
  function($provide) {
    $provide
      .decorator('$upload', function($delegate) {
        $delegate.checkSuffix = function checkSuffix(suffix, name) {
          var testSuffix = new RegExp('.' + suffix);
          return testSuffix.test((name).slice(-4)); // true / false
        };
        return $delegate;
      });

  }
]);