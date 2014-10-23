'use strict';

(function(lodash) {

  var _ = lodash;

  // MyRunsCtrl controller constructor function
  function MyRunsCtrl(runsSummaries) {
    var that = this;
    var sortedAsc = false; // used as a signal for sortResults()
    var sortByDateAsc = false; // used as a signal for sortByDate()

    that.runs = runsSummaries;

    that.sortedRuns = null;


/*    // sort results by date
    that.sortByDate = function sortByDate(runs) {
      if (sortByDateAsc === false) {
        sortByDateAsc = true;
        that.sortedRuns = _.sortBy(runs, 'date');
      } else {
        sortByDateAsc = false;
        that.sortedRuns = _.sortBy(runs, 'date').reverse();
      }
    };

    // sort results by time
    that.sortByTime = function sortByTime() {
      if (sortedAsc === false) {
        sortedAsc = true;
        that.sortedRuns = _.sortBy(that.Allruns, 'time');
      } else {
        sortedAsc = false;
        that.sortedRuns = _.sortBy(that.Allruns, 'time').reverse();
      }

    };*/

  }

  angular.module('runs').controller('MyRunsCtrl', [ 'runsSummaries', MyRunsCtrl ]);

}(window._));

