(function() {

'use strict';

/*
 * Upload a file to the database
 * Params: upload data service
 */

var UploadDataCtrl = function UploadDataCtrl($scope, upload) {

  $scope.message = upload.resultsListItems;
  $scope.fileName = 'Choose file';

  $scope.onFileSelect = function($files) {

    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];

      upload.uploadFile(file);

    } // for loop

  }; // $scope.onFileSelect

};


angular.module('upload-data').controller('UploadDataCtrl' , ['$scope', 'upload', UploadDataCtrl]);

})();