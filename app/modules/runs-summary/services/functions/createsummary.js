'use-strict';

/**
 * Create the summary using a revealing module pattern
 */

var createSummary = function createSummary(summaryList, totalDistance) {

//, totalTime, startTime, EndTime, restDuration

  var totalDistancInKm = totalDistance / 1000;
  var startTime = summaryList[0].startTime;
  var lastListItem = summaryList.length - 1;
  var endTime = summaryList[lastListItem].endTime;
  var totalTime =
    summaryList
      .map(function(list) {
        return list.totalTime;
      })
      .reduce(function(prevValue, currentValue, index, array) {
        var revisedTotalTime = prevValue + currentValue;
        return revisedTotalTime;
      }, 0);
  var avgSpeedPerKm = totalTime / summaryList.length;
  var restDuration =
    summaryList
      .map(function(list) {
        return list.paused.totalPauseTime;
      })
      .reduce(function(prevValue, currentValue, index, array) {
        var revisedRestDuration = prevValue + currentValue;
        return revisedRestDuration;
      }, 0);



  var summary = {
    totalDistanceKm : totalDistancInKm,
    totalTime : totalTime,
    startTime : startTime,
    endTime : endTime,
    markerItems : summaryList,
    avgSpeedPerKm : avgSpeedPerKm,
    restDuration : restDuration
  };

  return summary;

};

module.exports = createSummary;