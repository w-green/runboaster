'use strict';

var summarymarkerPrototype = require('../modules/runs-summary/prototypes/summarymarker.js');
var summaryMarkerBuilder = require('../modules/runs-summary/services/functions/summarymarkerbuilder.js');
var createSummary = require('../modules/runs-summary/services/functions/createsummary.js');
var totalDistanceCounter = require('../modules/runs-summary/services/functions/totaldistancecounter.js');
var factory = require('../../lib/custom/utils/object/factory.js');

var kmSummaryFactory;
var summaryList;
var summary;

// Used by calculate() to map data to a longitude and latitude
// format consistent with geolib
// output [[ { longitude: -0.220693, latitude: 51.459465 }, { time: Tue Jun 24 2014 13:46:23 GMT+0100 (BST) } ]]
var mapData = function mapData(data) {
  return data.map(function(currentValue, index, array) {
    var result = [];
    result.push(
        { longitude: currentValue[0], latitude: currentValue[1] },
        { time: currentValue[3] }
    );
    return result;
  });
}; // mapData

// record the start of each lap
var startOfEachLap = function startOfEachLap(startOfLap, kmMarker) {
  return {
    meters : kmMarker,
    data : startOfLap,
  };
}; // startOfEachLap

// increments the kmMarker
var setKmMarker = function setKmMarker(totalDistance) {
  // checking if number is int - if so we use Math.ceil()
  // to push the number up to the next integer
  var isInt = function isInt(n) {
     return n % 1 === 0;
  };
  var km = totalDistance / 1000;
  var result = isInt(km) ? km + 1 : Math.ceil(km);
  return result * 1000;
};

// records the end of lap
var endOfEachLap = function endOfEachLap(endOfLap, kmMarker) {
  return {
    meters : kmMarker,
    data : endOfLap,
    rest : true
  };
};


exports.calculate =
  function calculate(runData) {

    var run = {
      totalDistance : 0, // keeps track of total distance (km) for all laps = the runs total distance
      kmMarkers : [], // Marker points used for map
      lapStart : [], // these are used for calculating our pauses
      lapEnd : [] // it tells us what kmMarker the pauses were in
    };

    var kmMarker = 1000; // records count of kms as run is processed
    var mappedData;
    var startOfLap;
    var endOfLap;

    // loops over every lap. Each lap which contains an array of objects
    // that has coordinates and time
    // This creates the data for our summaries
    // (it outputs total distance, total times including pauses)
    var setSummData = function setSummData(data) {
      mappedData = mapData(data);

      // ----- get the start of each lap ----- //
      // allows us to calculate pauses
      startOfLap = mappedData[0];

      run.lapStart.push(startOfEachLap(startOfLap, kmMarker));

      // Reduces the mapped data down to return a total distance for each lap
      // Then adds this to the total distance in the parent scope
      // which counts the total distance for the run
      run.totalDistance = totalDistanceCounter(mappedData, run.totalDistance, kmMarker, run.kmMarkers);

      // ----- Updates the km marker ----- //
      // with output from totalDistanceCounter()
      kmMarker = setKmMarker(run.totalDistance);

      // ----- get the end of each lap ------ //
      // allows us to calculate pauses
      endOfLap = mappedData[mappedData.length -1];
      run.lapEnd.push(endOfEachLap(endOfLap, kmMarker));
    };

    if(Array.isArray(runData.features)) {
      runData.features.forEach(function(feature) {
        var runCoords = feature.geometry.coordinates;

        if(feature.geometry.type && feature.geometry.type.toLowerCase() === 'linestring' && (typeof runCoords[0][0] === 'number')) {
          setSummData(runCoords);
        }
        else {
          runCoords.forEach(setSummData);
        }

      }); //runData.features.forEach
    }

    // Factory used to create new km summaries
    kmSummaryFactory = function(props) {
      return factory(summarymarkerPrototype, props);
    };

    // create summaries - with pauses
    summaryList = summaryMarkerBuilder(run.kmMarkers, run.lapStart, run.lapEnd, kmSummaryFactory, run.totalDistance);

    // create summary
    summary = createSummary(summaryList, run.totalDistance);

    return summary;
  }; // calculate
