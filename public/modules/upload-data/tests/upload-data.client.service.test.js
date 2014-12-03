/*'use strict';

describe('Feature: upload data... ', function() {

  beforeEach(module('upload-data'));

  it('should return mock from upload', inject(function($http, $httpBackend, uploadService){
    var db = uploadService;
    var result;
    $httpBackend.when('POST', '/upload').respond(
    {
      message : 'hello'
    });

    db.save().$promise.then(
      function(data) {
        result = data;
      },
      function(error) {
        console.log('eeeeek error');
    });

    $httpBackend.flush();
    expect(result.message).toEqual('hello');


  }));

});
*/