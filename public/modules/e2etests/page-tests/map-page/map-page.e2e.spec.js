'use strict';

var login = require('../../tasks/login.js');
var logout = require('../../tasks/logout.js');
var mp = require('../../pages/map.page.js');
var utils = require('../../utils/utils.js');

describe('Map Page: ', function() {

  // ----- SET UP ----- //
  it('setup for tests', function() {
    var width = 1210;
    var height = 600;

    login.default();
    // set width to larger than 1200 so that the desktop view of summs is used
    browser.driver.manage().window().setSize(width, height);
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

  it('should add active class to summary when we click on a map summary', function() {

    var summarySecond =  mp.summaryList.get(1);
    var isItActive = false;

    summarySecond.click().then(function() {
      isItActive = utils.hasClass(summarySecond, 'active');
      assertTest();
    });

    function assertTest() {
      expect(isItActive).toBeTruthy();
    }
  });

  it('should change map when a summary is clicked on', function() {
    var summaryOne = mp.summaryList.get(0);
    var summarySecond =  mp.summaryList.get(1);
    var notification = false;
    var result;

    // resetting to summary one
    // Was set to second for tests above
    summaryOne.click()
      .then(
        function() {
          mp.getCurrentMapLayerLat().then(function(lat) {
            var isItOrigLatitude = clickSumm2nCheckLat(lat);

          });

          function clickSumm2nCheckLat(latitude){
            summarySecond.click().then(function() {
              mp.checkCurrentMapLayerLat(latitude).then(function(isIt) {
                result = isIt;
                assert();
              });
            });
          }
        }
      );

    function assert() {
      expect(result).toBeFalsy();
    }

  });


  // ----- TEAR DOWN ----- //
  it('tear down for tests', function() {
    browser.executeScript('document.getElementById("body-js").setAttribute("class", "");').then(function() {
      logout();
    });
  });

});
