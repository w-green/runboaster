var path = require('path');

var singleFile = '../../../../test-files/2014-06-24-1145.gpx';
var singleFalseFile = '../../../../test-files/test.md';
var dummyFiles = function(file) {
  return path.resolve(__dirname, file);
};


var uploadPage = {
  goto : function goto() {
      browser.get('/#!/my/upload/gpx');
    },
  uploadResultsList : element(by.id('uploadResults')),
  uploadBtn : element(by.id('uploadBtn')),
  uploadLabel : element(by.id('upload-label')),
  upload : {
    multiple : function() {

    },
    single : function() {
      var file = dummyFiles(singleFile);
      return uploadPage.uploadBtn.sendKeys(file);
    },
    singleFalse : function() {
      var file = dummyFiles(singleFalseFile);
      return uploadPage.uploadBtn.sendKeys(file);
    }
  }

};

module.exports = uploadPage;