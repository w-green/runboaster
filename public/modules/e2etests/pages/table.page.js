'use strict';

var theads = element.all(by.css('div[data-runs-summary-table] > table > thead > tr > th'));
var getTableCell = function getTableCell(row, cell, callback) {
  return element(by.css('div[data-runs-summary-table] > table > tbody > tr:nth-child(' + row + ') > td:nth-child(' + cell + ')')).getText();
};
var getDateByRow = function(num) {
  return getTableCell(num, 1); // returns a promise
};

// for use with q like so
//     Q.all(tp.getDateByRows([1, 3, 5])).done(function(rows){
//       console.log(rows[0])
//     });
var getDateByRows = function(nums) {
  var result = [];
  nums.forEach(function(num) {
    result.push(getDateByRow(num));
  });
  return result;
};


var tablePage = {
  goto : function goto() {
      browser.get('/#!/runs');
    },
  sortRuns : {
    byDate : function() {
      return theads.get(0).click();
    }
  },
  getTableCell : getTableCell,
  getDateByRow : getDateByRow,
  getDateByRows : getDateByRows
};

module.exports = tablePage;