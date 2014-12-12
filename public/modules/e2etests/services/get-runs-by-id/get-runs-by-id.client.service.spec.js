'use strict';

var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./get-runs-by-id.client.service.helper.js');


// NOTE for this you will need to know the Id of a run in mongo

describe('gets a run by id using the getRunsById service', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  it('get a run by an id using the normal get method', function() {
    var id = '5486ccc1026367e431dbd057';
    api.get(id)
      .then(function(run) {
        expect(run).toBeDefined();
        expect(run[0]._id).toMatch(id);
      });
  });


  it('get a run by an id using the resource query', function() {
    var id = '5486ccc1026367e431dbd057';
    api.getUsingResource(id)
      .then(function(run) {
        expect(run).toBeDefined();
        expect(run[0]._id).toMatch(id);
      });
  });


  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

});
