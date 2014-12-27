var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./get-summaries.client.service.helper.js');

describe('get runs summaries using getSummaries service', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });

  it('should return 3 summaries', function(){

    var query = {
      limit : 3,
      offset : 0
    };

    api.get(query)
      .then(function(summaries) {
        expect(summaries.aSumtotalTime).toEqual(jasmine.any(Number));
        expect(summaries.count).toEqual(3);
      });

  });

  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

});
