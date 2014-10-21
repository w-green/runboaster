'use-strict';

/**
 * @description Builds the summary data for each run / event - BUT IT DOES NOT INCLUDE PAUSES
 * @category function
 * @param {array} markers - An array of km runs
 * @param {object} startOfRun - start object for the first lap (run) - used for setting start time
 * @param {array} lapEnd - end objects for each lap (run) - used to get pauses
 * @param {function} summaryFactory - The factory function used to create each summary,
 * @returns {array} An array of the summaries.
 *
 */
var createSummaryList =
function createSummaryList(markers, startOfRun, summaryFactory) {
  var summary = []; // returned array of summaries

  markers.forEach(function(marker, index, array) {
    var kmSummaryProps = {
      km : marker.meters / 1000,
      startTime : getStartTime(),
      endTime : marker.data[1].time,
      rest : false, //was it paused
      paused :
        {
          startTime : [],
          endTime : [],
          totalPauseTime : null
        }
    };
    var singleSummary = summaryFactory(kmSummaryProps);
    singleSummary.setTotalTime();

    function getStartTime() {
      if (index === 0) { return startOfRun.data[1].time; }
        else { return array[index - 1].data[1].time; }
    }

    summary.push(singleSummary);
  });

  return summary;
};

module.exports = createSummaryList;