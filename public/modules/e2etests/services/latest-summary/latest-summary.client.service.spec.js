// var loginPage = require('../../pages/login.page.js');
var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./latest-summary.client.service.helper.js');

describe('latest summary service', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  // ----- TESTS ----- //
  it('should retrieve the latest summary for the user', function(){

    // Needs to be runs in db for this user
    api.summaries.getLatestSummary()
      .then(function(summary) {
        var runCount = summary.length;
        expect(runCount).toBeGreaterThan(0);
      });

  }); // it

  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

}); // describe

