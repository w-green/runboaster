'use strict';

var login = require('../../tasks/login');
var logout = require('../../tasks/logout');
var api = require('./get-summaries-by-id.client.service.helper.js');


// NOTE for this you will need to know the Id of a summary in mongo

describe('gets a summary by id using the getSummariesById service', function() {

  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });


  it('get a summary by an id using the normal get method', function() {
    var id = '5486ccc4026367e431dbd05c';
    api.get(id)
      .then(function(summary) {
        expect(summary).toBeDefined();
        expect(summary.id).toMatch(id);
      });
  });


  it('get a summary by an id using the resource query', function() {
    var id = '5486ccc4026367e431dbd05c';
    api.getUsingResource(id)
      .then(function(summary) {
        expect(summary).toBeDefined();
        expect(summary.id).toMatch(id);
      });
  });


  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    logout();
  });

});
