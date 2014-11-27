// Window resize

(function(lodash) {
  'use strict';
  var _ = lodash;

    var windowResize = function windowResize() {

      var registerTopic = {

        name : 'windowResize',

        addListener : function(callback) {

          var action =
            (function(callback) {
            return  _.debounce(callback, 150);
            })(callback);

          window.addEventListener(
            'resize',
            action
          );

          return action;

        },
        removeListener : function(action) {

          window.removeEventListener(
            'resize',
            action
          );
        }

      }; // registerTopic

      return registerTopic; // returns a reference to the active listener - to remove later

    }; // windowResize


  angular.module('mediator').service('windowResize', [windowResize]);

})(window._);