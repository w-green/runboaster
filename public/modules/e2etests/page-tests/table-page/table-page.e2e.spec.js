/**
 * BDD for upload page
 */

var login = require('../../tasks/login.js');
var logout = require('../../tasks/logout.js');
var tablePage = require('../../pages/table.page.js');

describe('Table Page: ', function() {
  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  it('should be able to sort by date', function(){
    tablePage.goto();

  });

});
