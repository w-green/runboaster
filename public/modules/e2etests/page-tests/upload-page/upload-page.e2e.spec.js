/**
 * BDD for upload page
 */

var login = require('../../tasks/login.js');
var logout = require('../../tasks/logout.js');
var uploadPage = require('../../pages/upload.page.js');


describe('Upload Page: ', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  it('should receive a success message if we upload gpx files', function() {
    uploadPage.goto();
    uploadPage.upload.single().then(function waitForResults() {
      browser.wait(function() {
        return element(by.css('.upload-file__message--success')).isPresent();
      }, 1500)
      .then(function(result) {
        expect(result).toBe(true);
      });
    });


  });

  it('should receive a warning message if we upload a non gpx file', function() {
    uploadPage.goto();
    uploadPage.upload.singleFalse().then(function waitForResults() {
      browser.wait(function() {
        return element(by.css('.upload-file__message--fail')).isPresent();
      }, 500)
      .then(function(result) {
        expect(result).toBe(true);
      });
    });
  });

  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

});