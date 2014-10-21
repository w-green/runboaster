'use strict';

(function(lodash) {

  var _ = lodash;

  // MyRunsCtrl controller constructor function
  function MyRunsCtrl(runsService) {
    var that = this;
    var sortedAsc = false; // used as a signal for sortResults()
    var sortByDateAsc = false; // used as a signal for sortByDate()

    that.sortedRuns = null;

    //that.name = 'hello world!!!';

    //that.Allruns = runsService.resource.query();


    that.Allruns =  runsService.getRuns(function(data){
                      that.Allruns = data;
                      that.sortedRuns = that.sortByDate();
                    });

// console.log(that.Allruns);

    // sort results by date
    that.sortByDate = function sortByDate() {
      if (sortByDateAsc === false) {
        sortByDateAsc = true;
        that.sortedRuns = _.sortBy(that.Allruns, 'date');
      } else {
        sortByDateAsc = false;
        that.sortedRuns = _.sortBy(that.Allruns, 'date').reverse();
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

    };

  }

  angular.module('runs').controller('MyRunsCtrl', [ 'runsService', MyRunsCtrl ]);

}(window._));

