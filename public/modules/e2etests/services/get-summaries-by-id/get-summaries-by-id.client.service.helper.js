'use strict';

module.exports = {
  get : function get(id) {

    return browser.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var angDoc = angular.element(document);
      var Authentication = angDoc.injector('users').get('Authentication');
      var api = angDoc.injector('runs').get('getSummariesById');
      api.get(arguments[0]).then(function(data) {
        callback(data);
      });
    }, id); // return
    // return result;

  }, // getById

  getUsingResource : function get(id) {

    return browser.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var angDoc = angular.element(document);
      var Authentication = angDoc.injector('users').get('Authentication');
      var api = angDoc.injector('runs').get('getSummariesById');
      api.resource.query({'user_id' : Authentication.user._id, 'summary_id' : arguments[0]}, function(data) {
        callback(data);
      });
    }, id); // return

  } // getUsingResource

};