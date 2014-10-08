/*
Make sure checkSuffix gets called - stub it.
Make sure it returns false if it is not a gpx file
Make sure it returns true if it is a gpx file
Once success is called the scope.message contains the latest file
 */

describe('Controller: updload-data', function() {
  var scope, ctrl;

  beforeEach(module('upload-data'));
  beforeEach(inject(function($controller, $rootScope){

    // Set a new global scope
    scope = $rootScope.$new();

    ctrl = $controller('UploadDataCtrl', {$scope: scope});

  }));


  it('should call the checkSuffix function ', inject(function($upload, $httpBackend){

    var config = {
      file : { name : 'file.gpx'}
    };

    $httpBackend
      .when('POST', '/upload')
      .respond(config);

    spyOn($upload, 'checkSuffix');

    var file = [{'name' : 'file.gpx'}];

    scope.onFileSelect(file);

    //$upload.checkSuffix('gpx', 'file.gpx');

    expect($upload.checkSuffix).toHaveBeenCalled();

  }));

  it('the checkSuffix function should return false if not a gpx file', inject(function($upload){
    var result = $upload.checkSuffix('gpx', 'file.csv')
    expect(result).toBe(false);
  }));

  it('the checkSuffix function should return true if not a gpx file', inject(function($upload){
    var result = $upload.checkSuffix('gpx', 'file.gpx')
    expect(result).toBe(true);
  }));

  it('should add the success message to the scope.message array', function(){

  });





});
