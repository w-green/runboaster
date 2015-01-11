'use strict';

var login = require('../../tasks/login.js');
var logout = require('../../tasks/logout.js');

describe('Top Nav : Toggle menu class on body via menu icon : ', function() {

  // ----- SET UP ----- //
  it('setup for tests', function() {
      login.default();
  });

  it('should toggle the body with a new class when menu icon is clicked', function(){
    var bod;
    browser.get('/#!/');

    element(by.id('menu-icon-js'))
      .click()
      .then(function() {
        bod = element(by.id('body-js'));
        var elClass = bod.getAttribute('class');
        expect(elClass).toMatch('leftNav--toggle');
      });

  });
  it('should remove the class when menu icon is clicked again', function(){
    var bod;
    browser.get('/#!/');

    var el = element(by.id('menu-icon-js'));

    // first toggle the class on
    el
      .click()
      .then(function() {
        bod = element(by.id('body-js'));
        var elClass = bod.getAttribute('class');
        expect(elClass).toMatch('leftNav--toggle');

        // then toggle the class off
        el
          .click()
          .then(function() {
            var elClassNew = bod.getAttribute('class');
            expect(elClassNew).toMatch('');
          });
      });
  });

  // ----- TEAR DOWN ----- //
  it('tear down for tests', function() {
    browser.executeScript('document.getElementById("body-js").setAttribute("class", "");').then(function() {
      logout();
    });
  });

});
