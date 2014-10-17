'use-strict';

/**
 * @description Reduces the mapped data down to return a distance for each lap.
 * Then adds this to the total distance in the parent scope which counts the total distance for the run
 * @param {array} mappedData - An array of coordinates and times in the geolib format
 * @param {number} totalDistance - the total distance for run so far
 * @param {number} kmMarker - the next km marker that will trigger a summary
 * @param {array} kmMarkers - the summaries attached to previous km markers
 * @returns updates totalDistance, kmMarker, kmMarkers
 */


var geolib = require('../../../../../lib/Geolib/dist/geolib.min.js');

 var totalDistanceCounter =
  function totalDistanceCounter(mappedData, totalDistance, kmMarker, kmMarkers) {

    return mappedData.reduce(function(prevValue, currentValue, index, array) {
      // We are starting from index 1.
      // This allows us to use the current total distance from previous laps
      // as the initial value for each new lap.
      var prev = (index === 1) ? totalDistance : prevValue;
      var distance =
        geolib.getDistance(
          array[index - 1][0],
          array[index][0]
        );
      var marker;

      currentValue = prev + distance;

      if (currentValue >= kmMarker) {
        marker = {
          meters   : kmMarker,
          data : array[index]
        };

        kmMarkers.push(marker);
        kmMarker = kmMarker + 1000;
      };

      return currentValue; // next prevValue
    }); // reduce
  }; // reduceData

module.exports = totalDistanceCounter;