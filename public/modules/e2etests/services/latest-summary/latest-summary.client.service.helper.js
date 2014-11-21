module.exports = {
  summaries : {
    getLatestSummary : function() {

      return browser.executeAsyncScript(function(callback) {
        var angDoc = angular.element(document);
        var Authentication = angDoc.injector('users').get('Authentication');
        var api = angDoc.injector('runs').get('latestSummary');

        api.resource.query({'user_id' : Authentication.user._id}, function(data) {
          callback(data);
        });

      });
    } // getLatestTen
  } // summaries
}; // exports
