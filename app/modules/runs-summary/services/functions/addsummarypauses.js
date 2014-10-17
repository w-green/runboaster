'use-strict';

var _ = require('lodash');

/**
 * @description Adds the pauses and restarts to the summary data
 * @category function
 * @requires lodash
 * @param {array} lapPauses - An array of lap ends where runner has paused
 * @param {array} lapReStart - An array of lap starts where runner has resumed running
 * @param {array} summaryList - An array of summaries
 * @returns nothing - just modifies the summaries
 */


var addSummaryPauses =
function addSummaryPauses(lapPauses, lapReStart, summaryList) {
  lapPauses.forEach(function(lap, index, array) {
    var kmMarker = lap.meters / 1000;
    var summary = _.find(summaryList, {'km' : kmMarker});

    summary.rest = true;
    summary.paused.startTime.push(lap.data[1].time);
    summary.paused.endTime.push(lapReStart[index].data[1].time);
    summary.settotalPauseTime();
    summary.setTotalTime();
  });
};

module.exports = addSummaryPauses