(function() {

'use strict';

/**
 * @description : a service that uploads a gpx to the db.
 * @param $upload the decorator used for the angular file upload module.
 * @param $rootScope
 * @returns {Object} upload function and results items
 */

var upload = function upload($upload, $rootScope) {

  var uploadSuccess;
  var uploadProgress;
  var upload;
  var resultsListItems = [];
  var uploadDefineVars;
  var uploadFile;

  // define vars dependent on whether web workers are available
  uploadDefineVars = function uploadDefineVars() {

    if (window.Worker instanceof Function) {

      // Send them to the web worker
      uploadSuccess = function uploadSuccess(message) {
        // file is uploaded successfully
        resultsListItems
          .push('<li class="bg-success">Successfully uploaded: ' + message.data + '</li>');
        $rootScope.$apply();
      }

      upload = function upload(file) {
        var worker = new Worker('/lib/custom/angular-file-upload-extra/web-worker.js');
        worker.postMessage(file);
        worker.onmessage = uploadSuccess;
      };

    }
    else {

      // ORIGINAL WAY OF USING ANGULAR FILE UPLOAD
      uploadSuccess = function uploadSuccess(data, status, headers, config) {
        // file is uploaded successfully
        resultsListItems
          .push('<li class="bg-success">Successfully uploaded: ' + config.file.name + '</li>');
      }

      uploadProgress = function uploadProgress(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }

      upload = function upload(file) {
        // $scope.upload =
        $upload
          .upload({
              url: '/upload', //upload.php script, node.js route, or servlet url
              method: 'POST',
              //headers: {'header-key': 'header-value'},
              //withCredentials: true,
              //data: {myObj: $scope.myModelObj},
              file: file, // or list of files ($files) for html5 only
              //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
              // customize file formData name ('Content-Disposition'), server side file variable name.
              //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
              // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
              //formDataAppender: function(formData, key, val){}
            })
          .progress(uploadProgress)
          .success(uploadSuccess);
        //.error(...)
        //.then(success, error, progress);
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      };

    };

  }; // uploadDefineVars

  uploadDefineVars();

  uploadFile = function(file) {

    // We've added a decorator to check the suffix
    // returns true if suffix is gpx
    var isitGpx = $upload.checkSuffix('gpx', file.name);
    if (isitGpx === false) {
      return  resultsListItems
        .push('<li class="bg-danger">The file needs to be a gpx : ' + file.name + '</li>');
    }

    upload(file);

  };


  return {
    resultsListItems : resultsListItems,
    uploadFile : uploadFile
  };

};

angular.module('upload-data').service('upload', ['$upload', '$rootScope', upload]);

})();