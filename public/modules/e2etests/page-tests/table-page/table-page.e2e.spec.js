var Q = require('q');

/**
 * BDD for upload page
 */

var login = require('../../tasks/login.js');
var logout = require('../../tasks/logout.js');
var tp = require('../../pages/table.page.js');

describe('Table Page: ', function() {
  // ----- SET UP ----- //
  it('setup for tests', function(){
      login.default();
  });

  it('should be sorted by date initially', function(){

    tp.goto();

    Q.all(tp.getDateByRows([1, 3, 5])).done(function(rows){
      var data = rows.map(function(val) {
        var runDate = val.substr(0, 16);
        return new Date(runDate);
      });

      var firstRow = data[0];
      var thirdRow = data[1];
      var fifthRow = data[2];

      expect(thirdRow).toBeLessThan(firstRow);
      expect(fifthRow).toBeLessThan(thirdRow);
    });

  });


  it('should be able to sort by date', function(){
    tp.goto();

    // remove the left nav because selenium can only click on
    // elements that are visible. If the left nav is visible it hides
    // the tables' headings
    browser.executeScript('document.getElementById("body-js").setAttribute("class", "leftNav--toggle");').then(function() {

      Q.all(tp.getDateByRows([1, 10])).done(function(rows){
        var firstRow = rows[0];
        var lastRow = rows[1];

        tp.sortRuns.byDate()
          .then(function(){
            Q.all(tp.getDateByRows([1, 10])).done(function(rows){
              var newFirstRow = rows[0];
              var newLastRow = rows[1];
              expect(firstRow).toMatch(newLastRow);
              expect(lastRow).toMatch(newFirstRow);
            });
          }); // then

      }); // Q

    }); // browser.executeScript

  }); // it

  // ----- TEAR DOWN ----- //
  it('tear down for tests', function(){
    browser.executeScript('document.getElementById("body-js").setAttribute("class", "");').then(function() {
      logout();
    });
  });

});
