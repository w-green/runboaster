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
        return new Date(val);
      });

      var firstRow = data[0];
      var thirdRow = data[1];
      var fifthRow = data[2];

      expect(firstRow).toBeLessThan(thirdRow);
      expect(fifthRow).not.toBeLessThan(thirdRow);
    });

  });


  it('should be able to sort by date', function(){
    tp.goto();

    Q.all(tp.getDateByRows([1, 10])).done(function(rows){
      var firstRow = rows[0];
      var lastRow = rows[1];

      tp.sortRuns.byDate()
        .then(function(){
          tp.sortRuns.byDate()
            .then(function(){
              Q.all(tp.getDateByRows([1, 10])).done(function(rows){
                var newFirstRow = rows[0];
                var newLastRow = rows[1];
                expect(firstRow).toMatch(newLastRow);
                expect(lastRow).toMatch(newFirstRow);
              });
            }); // then
        }); // then
    }); // Q

  }); // it

});
