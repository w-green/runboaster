var path = require('path');

(function(){
  'use strict';

  describe('testing upload', function() {
    beforeEach(function() {
      login();

      function login() {

        browser.get('/#!/signin');
        var formUsername = element(by.id('username'));
        var formPwd = element(by.id('password'));
        var formSubmit = element(by.css('[type="submit"]'));

        formUsername.sendKeys('wgreen');
        formPwd.sendKeys('password');
        formSubmit.click();
      }
    });



    it('displays an a success message with the file name when uploaded', function(){
      var url, formFile, result;
      var fileToUpload = '../../../../../test-files/firsttest.gpx';
      var absolutePath = path.resolve(__dirname, fileToUpload);

      browser.get('/#!/my/upload/gpx');

      formFile = element(by.id('uploadBtn'));
      formFile.sendKeys(absolutePath);

      result = element(by.css('#uploadResults li'));

      result.getText().then(function(data) {
        expect(data).toContain('firsttest.gpx');
      });

      // browser.debugger();

    });

  });

}());