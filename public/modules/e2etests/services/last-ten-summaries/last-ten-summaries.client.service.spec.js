var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./last-ten-summaries.client.service.helper.js');

describe('last ten summaries service', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  // ----- TESTS ----- //

  it('should retrieve the last ten summaries unformatted', function(){

    // Needs to be runs in db for this user
    api.summaries.getLatestTenUnformatted().then(function(summary) {
      var runCount = summary.length;
      expect(runCount).toBeGreaterThan(0);
    });

  }); // it

  it('should retrieve the last ten runs formatted', function(){

    // Needs to be runs in db for this user
    api.summaries.getLatestTenFormatted().then(function(summary) {
      expect(summary.longestMarkerTime).toBeDefined();
      // console.log(summary);
    });

  }); // it


  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

}); // describe

