'use strict';

(function() {

  // MyRunsCtrl controller constructor function
  function MyRunsCtrl() {
    var vm = this;
    vm.name = 'hello world!!!';

    // mock data for our runs
    vm.runs = [
      { date : new Date(2014, 08, 20), time : { minutes : 31, seconds : 58 } },
      { date : new Date(2014, 08, 21), time : { minutes : 31, seconds : 20 } },
      { date : new Date(2014, 08, 22), time : { minutes : 32, seconds : 35 } }
    ];
    vm.count = vm.runs.length;
  }

  angular.module('runs').controller('MyRunsCtrl', [ MyRunsCtrl ]);

}());

