module.exports = {

  get : function get(options) {

    // set default options
    var query = {
      limit : 1,
      offset : 0
    };

    if(options){
      query = {
        limit : options.limit ? options.limit : 1,
        offset : options.offset ? options.offset : 0
      };
    }

    return browser.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var angDoc = angular.element(document);
      var Authentication = angDoc.injector('users').get('Authentication');
      var api = angDoc.injector('runs').get('getRuns');

      api.get(arguments[0]).then(function(data) {
        callback(data.length);
      });

    }, query); // return

  } // get

};