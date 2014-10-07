"use strict";

/*
 * Upload a file to the database
 * Params: upload data service
 */
var UploadDataCtrl = function UploadDataCtrl($scope, $upload) {

/*  // allows us to see the file that was uploaded
  document.getElementById("uploadBtn").onchange = function () {
      document.getElementById("uploadFile").value = this.value;
  };*/
  $scope.message = [];
  $scope.message.push("<p></p>");
  $scope.fileName = 'Choose file';

  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.

    // Angular file upload's file type is not working so we implemented our own.
    function checkSuffix(suffix, name) {
      var testSuffix = new RegExp('.' + suffix)
      return testSuffix.test((name).slice(-4)); // true / false
    }

    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];

      // returns true if suffix is gpx
      var isitGpx = checkSuffix('gpx', file.name);
      console.log(isitGpx);
      if (isitGpx === false) {
        $scope.message.push('<p class="text-danger">The file needs to be a gpx : ' + file.name + '</p>');
        continue;
      }

      $scope.upload = $upload.upload({
        url: '/upload', //upload.php script, node.js route, or servlet url
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully

        // console.log(config.file.name); // WORKS
        $scope.message.push('<p class="text-success">Successfully uploaded: ' + config.file.name + '</p>');

      });
      //.error(...)
      //.then(success, error, progress);
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };

};


angular.module('upload-data').controller('UploadDataCtrl' , ['$scope', '$upload', UploadDataCtrl]);