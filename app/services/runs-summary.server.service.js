'use strict';

var summarymarkerPrototype = require('../modules/runs-summary/prototypes/summarymarker.js');
var summaryMarkerBuilder = require('../modules/runs-summary/services/functions/summarymarkerbuilder.js');
var createSummary = require('../modules/runs-summary/services/functions/createsummary.js');
var totalDistanceCounter = require('../modules/runs-summary/services/functions/totaldistancecounter.js');
var factory = require('../../lib/custom/utils/object/factory.js');


exports.calculate =
  function calculate(runData) {
    var runCoords = runData.features[0].geometry.coordinates; // The run which contains an array of laps which each have an array of coordinates
    var totalDistance = 0; // keeps track of total distance (km) for all laps = the runs total distance
    var kmMarkers = []; // Marker points used for map
    var kmMarker = 1000; // used below in reduceData() to mark kms

    // these are used for calculating our pauses
    // it tells us what kmMarker the pauses were in
    var lapStart = [];
    var lapEnd = [];


    // loops over every lap. Each lap which contains an array of objects
    // that has coordinates and time
    // This creates the data for our summaries
    // (it outputs total distance, total times including pauses)
    runCoords.forEach(function(data) {

      // We're resaving the data into a format suitable with geolib so
      // that we can run calculations for distance
      var mappedData;
      var startOfLap;
      var endOfLap;

      // output [[ { longitude: -0.220693, latitude: 51.459465 }, { time: Tue Jun 24 2014 13:46:23 GMT+0100 (BST) } ]]
      mappedData = mapData(data);


      // ----- get the start of each lap ------ //
      // allows us to calculate pauses
      startOfLap = mappedData[0];
      var startOfEachLap = function startOfEachLap(start, marker) {
        return {
          meters : kmMarker,
          data : startOfLap,
        };
      };
      lapStart.push(startOfEachLap(startOfLap, kmMarker));


      // Reduces the mapped data down to return a total distance for each lap
      // Then adds this to the total distance in the parent scope
      // which counts the total distance for the run
      var revisedTotalDistance = totalDistanceCounter(mappedData, totalDistance, kmMarker, kmMarkers);
      totalDistance = revisedTotalDistance;

      // console.log(JSON.stringify(kmMarkers, null, 2));

      // ----- Updates the km marker ----- //
      // with output from totalDistanceCounter()
      kmMarker = setKmMarker(totalDistance);
      function setKmMarker(totalDistance) {
        var km = totalDistance / 1000;
        var result = isInt(km) ? km + 1 : Math.ceil(km);
        return result * 1000;
      }
      // checking if number is int - if so we use Math.ceil()
      // to push the number up to the next integer
      function isInt(n) {
         return n % 1 === 0;
      }


      // ----- get the end of each lap ------ //
      // allows us to calculate pauses
      endOfLap = mappedData[mappedData.length -1];
      var endOfEachLap = function endOfEachLap(endOfLap, kmMarker) {
        return {
          meters : kmMarker,
          data : endOfLap,
          rest : true
        };
      };
      lapEnd.push(endOfEachLap(endOfLap, kmMarker));


      function mapData(data) {
       return data.map(function(currentValue, index, array) {
          var result = [];
          result.push(
              { longitude: currentValue[0], latitude: currentValue[1] },
              { time: currentValue[3] }
          );
          return result;
        });
      } // mapData

    }); // forEach


    // Factory used to create new km summaries
    var kmSummaryFactory = function(props) {
      return factory(summarymarkerPrototype, props);
    };

    // create summaries - with pauses
    var summaryList = summaryMarkerBuilder(kmMarkers, lapStart, lapEnd, kmSummaryFactory, totalDistance);
    // console.log(JSON.stringify(summaryList, null, 2));

    // create summary
    var summary = createSummary(summaryList, totalDistance);

    return summary;
  }; // calculate
