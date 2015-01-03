'use strict';

var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./get-runs-by-id.client.service.helper.js');


// NOTE for this you will need to know the Id of a run in mongo

describe('gets a run by id using the getRunsById service', function() {
  var id = '54a3ca0a06db4abb25595f8e';

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  it('get a run by an id using the normal get method', function() {
    api.get(id)
      .then(function(run) {
        expect(run.id).toBeDefined();
        expect(run.id).toMatch(id);
      });
  });


  it('get a run by an id using the resource query', function() {
    api.getUsingResource(id)
      .then(function(run) {
        expect(run.id).toBeDefined();
        expect(run.id).toMatch(id);
      });
  });


  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

});
