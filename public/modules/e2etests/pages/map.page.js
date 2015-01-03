'use strict';

var sumListContainer = element(by.css('[data-map-summaries]'));

var mapPage = {
  goto : function goto() {
      browser.get('/#!/runs/map');
    },
  summaryListContainer : sumListContainer,
  summaryList : sumListContainer.all(by.tagName('div'))
};

module.exports = mapPage;