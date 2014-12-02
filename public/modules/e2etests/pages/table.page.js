'use strict';
var theads = element(by.css('runs-summary-table > table > thead > tr > th'));


var tablePage = {
  goto : function goto() {
      browser.get('/#!/runs');
    },
  sortRuns : {
    ByDate : function() {
      console.log(theads);
    }
  }
};

module.exports = tablePage;