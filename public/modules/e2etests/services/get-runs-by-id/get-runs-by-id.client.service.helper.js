// documentation on executeAsyncScript
// http://angular.github.io/protractor/#/api?view=webdriver.WebDriver.prototype.executeAsyncScript


module.exports = {
  get : function get(id) {

    return browser.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var angDoc = angular.element(document);
      var Authentication = angDoc.injector('users').get('Authentication');
      var api = angDoc.injector('runs').get('getRunById');
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
      var api = angDoc.injector('runs').get('getRunById');
      api.resource.query({'user_id' : Authentication.user._id, 'run_id' : arguments[0]}, function(data) {
        callback(data);
      });
    }, id); // return

  } // getById
}; // exports




// module.exports = {
//   get : function get(id) {

//     return browser.executeAsyncScript(function() {
//       var callback = arguments[arguments.length - 1];
//       var angDoc = angular.element(document);
//       var Authentication = angDoc.injector('users').get('Authentication');
//       var api = angDoc.injector('runs').get('getRunById');
//       api.resource.query({'user_id' : Authentication.user._id, 'run_id' : arguments[0]}, function(data) {
//         callback(data);
//       });
//     }, id); // return

//   } // getById
// }; // exports

// alternative way

/*module.exports = {
  get : function get(id) {
    return browser.executeAsyncScript(
      "var callback = arguments[arguments.length - 1];" +
      "var id = '5486ccc1026367e431dbd057';" +
      "var angDoc = angular.element(document);" +
      "var Authentication = angDoc.injector('users').get('Authentication');" +
      "var api = angDoc.injector('runs').get('getRunById');" +
      "api.resource.query({ 'user_id' : Authentication.user._id, 'run_id' : arguments[0] }, function(data) { callback(data); });"
    , id); // return
    // return result;

  } // getById
}; // exports*/