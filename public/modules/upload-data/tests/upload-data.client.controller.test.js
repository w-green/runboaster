/**
 * Unit test for upload data controller
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
    var file;
    var config = {
      file : { name : 'file.gpx'}
    };

    $httpBackend
      .when('POST', '/upload')
      .respond(config);

    spyOn($upload, 'checkSuffix');

    file = [{'name' : 'file.gpx'}];

    scope.onFileSelect(file);

    expect($upload.checkSuffix).toHaveBeenCalled();

  }));

  it('the checkSuffix function should return false if not a gpx file', inject(function($upload){
    var result = $upload.checkSuffix('gpx', 'file.csv');
    expect(result).toBe(false);
  }));

  it('the checkSuffix function should return true if not a gpx file', inject(function($upload){
    var result = $upload.checkSuffix('gpx', 'file.gpx');
    expect(result).toBe(true);
  }));

  it('should add an item to the list', inject(function($compile){

    var resultsUl = '<ul upload-results id="uploadResults"></ul>';
    var resultItem = '<li class="bg-success">Successfully uploaded</li>';

    var el = $compile(resultsUl)(scope);
    scope.$apply();

    scope.message = [];
    scope
      .message
      .push(resultItem);
    scope.$apply();
    expect(el.html()).toContain('Successfully uploaded');
  }));


});
