'use strict';

var uploadService = function uploadService($resource) {
  return $resource('/upload');
};




angular.module('upload-data').factory('uploadService', ['$resource', uploadService]);