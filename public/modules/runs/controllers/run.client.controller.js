'use strict';

(function(lodash) {

  var _ = lodash;

  // MyRunsCtrl controller constructor function
  function MyRunCtrl($state) {
    var that = this;
    that.name = 'hello world';
    // $state.transitionTo('run.map');

  }

  angular.module('runs').controller('MyRunCtrl', MyRunCtrl);

}(window._));



