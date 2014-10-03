var path = require('path');

(function(){
  'use strict';

  ddescribe('testing upload', function() {
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



    it('does bullox all', function(){
      var url, formFile, formSubmit;
      var fileToUpload = '../../../../test-files/firsttest.gpx';
      var absolutePath = path.resolve(__dirname, fileToUpload);

      browser.get('/#!/my/upload/gpx');
      formFile = element(by.id('fileGpx'));
      formSubmit = element(by.id('submitGpx'));


      formFile.sendKeys(absolutePath);
      formSubmit.click();
      // lets login




    });

  });

}());