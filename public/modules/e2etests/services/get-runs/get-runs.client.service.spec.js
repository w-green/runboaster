var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./get-runs.client.service.helper.js');

describe('get runs using getRuns service', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });

  it('should return 3 runs', function(){

    var query = {
      limit : 3,
      offset : 0
    };

    api.get(query)
      .then(function(runCount) {
        expect(runCount).toEqual(3);
      });

  });

  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

});