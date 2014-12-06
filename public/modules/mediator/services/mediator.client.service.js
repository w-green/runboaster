(function(lodash) {
  'use strict';

  var _ = lodash;

  var mediator = function(windowResize){

    // ----- Topics ----- //

    var topics = {};

    var topicPrototype = {
      subscribers : []
    };

    var topicFactory = function topicFactory(newTopic) {
      return angular.extend(topicPrototype, newTopic);
    };

    var addTopic = function addTopic(name, options) {
      if(!(topics[name] instanceof Object)) {
        var aTopic = topicFactory(options);
        topics[name] = aTopic;
      }
    };

    // Initiate our topics from the passed in services
    // note just move the slice number up if need other services
    // which are not topics
    var eventTopics = [].slice.call(arguments, 0);

    (function(){
      eventTopics.forEach(function(topic) {
        addTopic(topic.name, topic);
      });
    })();

    // ----- END Topics ----- //


    // test
    // addTopic('windowResize', windowResize);

    // ----- Add / remove subs to topics ----- //

    var addSubToTopic = function addSubToTopic(topic, sub) {
      var activeListener;

      if(topics[topic] instanceof Object) {
        topics[topic].subscribers.push(sub);

        var addListener = function(fn, context) {
          var callback = function() {fn.call(context);};
          var listener = topics[topic].addListener(callback);

          return listener;
        };

        activeListener = addListener(sub.fn, sub.context);

      }
      else {
       console.log('NO TOPIC OF THAT DESCRIPTION');
      }

      return activeListener;
    };


    var rmSubFromTopic = function rmSubFromTopic(topic, guid){
      var topic = topics[topic];
      var ind = _.findIndex(topic.subscribers, {'guid' : guid});
      topic.subscribers.splice(ind, 1); // remove sub
    };

    // guid generator
    function guidGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };

      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    var subscribe = function(topic, fn, context) {
      var Subscriber = function(topic, fn, context) {
        this.guid = guidGenerator();
        this.topic = topic;
        this.fn = fn;
        this.context = context;
      };
      var sub = new Subscriber(topic, fn, context);
      sub.activeListener = addSubToTopic(sub.topic, sub);

      return sub;
    };


    var getSubscribers = function getSubscribers(topic) {
      var subs = [];
      if(topics[topic] instanceof Object) {
        subs = topics[topic].subscribers;
      }
      return subs;
    };


    var unsubscribe = function(sub) {

      if (topics[sub.topic] instanceof Object) {
        var topic = topics[sub.topic];
        topic.removeListener(sub.activeListener);
        rmSubFromTopic(sub.topic, sub.guid);
      }
      else {
        console.log('event / topic does not exist');
      }

    };

    var actions = {
      subscribe : subscribe,
      unsubscribe : unsubscribe,
      getSubscribers : getSubscribers
    };

    return actions;
  };

  angular.module('mediator').service('mediator', ['windowResize', mediator]);

}(window._));