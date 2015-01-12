'use strict';

var sumListContainer = element(by.css('[data-map-summaries]'));
var summaryList = sumListContainer.all(by.tagName('div'));


var mapPage = {
  goto : function goto() {
      browser.get('/#!/runs/map');
    },
  summaryListContainer : sumListContainer,
  summaryList : summaryList,
  summarySecond : summaryList.get(1),
  getCurrentMapLayerLat : function getCurrentMapLayerLat() {
    return browser.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var result;
      var svgEl = document.querySelector('svg');
      var scoper;

      svgEl = angular.element(svgEl);
      scoper = svgEl.scope();

      function getLayerLat(layer) {
        var lat;

        for(var p in layer) {

          if(layer[p]._latlng) {
            lat = layer[p]._latlng.lat;
          }

        }

        return lat;
      }

      result = getLayerLat(scoper.getCurrentLayerGroup()._layers);

      callback(result);

    });
  },

  checkCurrentMapLayerLat : function checkCurrentMapLayerLat(origLat) {
    return browser.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var origLat = arguments[0];
      var result;
      var svgEl = document.querySelector('svg');
      var scoper;

      svgEl = angular.element(svgEl);
      scoper = svgEl.scope();

      function getLayerLat(layer) {
        // var isItOrig = false;
        var isItOrig;

        for(var p in layer) {
          isItOrig = false;
          if(layer[p]._latlng && layer[p]._latlng.lat === origLat) {
            // isItOrig = true;
            isItOrig = layer[p]._latlng.lat;
          }

        }

        return isItOrig;
      }

      result = getLayerLat(scoper.getCurrentLayerGroup()._layers);

      callback(result);

    }, origLat);
  }
};




module.exports = mapPage;