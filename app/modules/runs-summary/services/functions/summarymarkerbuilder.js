'use-strict';
var createSummaryList = require('./createsummarylist.js');
var addSummaryPauses = require('./addsummarypauses.js');

/**
 * @description Builds the summary data for each run / event.
 * @category function
 * @requires lodash
 * @param {array} markers - An array of km runs
 * @param {object} lapStart - start object for the first lap (run) - used for setting start time
 * @param {array} lapEnd - end objects for each lap (run) - used to get pauses
 * @param {function} summaryFactory - The factory function used to create each summary,
 * @returns {array} An array of the summaries.
 *
 */

var summaryMarkerBuilder = function summaryMarkerBuilder(markers, lapStart, lapEnd, kmSummaryFactory, totalDistance) {
  var lapPauses;
  var lapReStart;
  var startOfRun = lapStart[0];

  var summaryList = createSummaryList(markers, startOfRun, kmSummaryFactory);

  // Only run pauses if there are pauses.
  // Note if only one lapEnd it is the finish of run - not pause
  if (lapEnd.length === 0) {return summaryList};

  // use the LapEnd but remove the last one as it is when stopped not paused
  lapPauses = lapEnd.slice(0, -1);

  // use the lapStart but with first removed as that is the start of the run not restarts
  lapReStart = lapStart.slice(1);

  // adds the pauses to the summaries
  addSummaryPauses(lapPauses, lapReStart, summaryList);

  return summaryList;

};

module.exports = summaryMarkerBuilder;