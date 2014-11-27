/*(function(lodash) {
  'use strict';

  var _ = lodash;

  var windowResize = function(){

    // ----- Mediator ----- //

    var subscribers = [];

    // guid generator
    function guidGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };

      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    // on resize fire callback fns
    var subscribe = function(fn) {
      var Subscriber = function(fn) {
        this.guid = guidGenerator();
        this.fn = fn;
      };
      var sub = new Subscriber(fn);
      subscribers.push(sub);
      // subscribers.push({context : this , callback : fn, guid : guid});
      return sub.guid;
    };

    var unsubscribe = function(guid) {
      var index = _.findIndex(subscribers, guid);
      subscribers.splice(index, 1);
      return subscribers;
      // return subscribers.indexOf(sub[guid]);
    };

    var getSubscribers = function() {
      return subscribers;
    };


    var actions = {
      subscribe : subscribe,
      unsubscribe : unsubscribe,
      getSubscribers : getSubscribers
    };

    return actions;

  };

  // can use set and get / remove methods here with add and remove listeners


  angular.module('customCore').service('windowResize', [windowResize]);

}(window._));*/