/**
 * Helper that injects service into browser
 */

module.exports = {
  summaries : {
    getLatestTenUnformatted : function() {
      return browser.executeAsyncScript(function(callback) {
        var api = angular.element(document).injector('runs').get('latestTen');
        api.resource.query({}, function(data) {
          callback(data);
        });
      });
    }, // getLatestTenUnformatted
    getLatestTenFormatted : function() {
      return browser.executeAsyncScript(function(callback) {
        var api = angular.element(document).injector('runs').get('latestTen');
        api.getRuns().then(function(data) {
          callback(data);
        });
      });
    } // getLatestTenFormatted
  } // summaries
};