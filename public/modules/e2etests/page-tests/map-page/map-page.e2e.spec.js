'use strict';

var login = require('../../tasks/login.js');
var logout = require('../../tasks/logout.js');
var mp = require('../../pages/map.page.js');

describe('Map Page: ', function() {

  // ----- SET UP ----- //
  it('setup for tests', function() {
      login.default();
      mp.goto();
  });

  it('should contain a list of summaries with order numbers and map ids.', function() {

    var mapNo = -1;
    var activityId;
    // var summaryListContainer = mp.summaryListContainer;
    var aSummary = mp.summaryList.get(2);

    aSummary
      .getAttribute('data-list-order')
      .then(function(listOrder) {
        mapNo = parseInt(listOrder);
        expect(mapNo).toEqual(2);
      });

    aSummary
      .getAttribute('data-activity-id')
      .then(function(aId) {
        activityId = aId;
        expect(typeof activityId).toMatch('string');
      });

  });

  // it('should update the map with the map that matches the clicked on summary', function() {



  // });



  // ----- TEAR DOWN ----- //
  it('tear down for tests', function() {
    browser.executeScript('document.getElementById("body-js").setAttribute("class", "");').then(function() {
      logout();
    });
  });

});
