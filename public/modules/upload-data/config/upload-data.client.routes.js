'use strict';

// Setting up route
angular.module('upload-data').config(['$stateProvider',
  function($stateProvider) {
    // Runs state routing
    $stateProvider
    .state('upload', {
      url: '/upload/gpx',
      templateUrl: 'modules/upload-data/views/upload-data.client.view.html',
      controller: 'UploadDataCtrl'
    });
  }
]);