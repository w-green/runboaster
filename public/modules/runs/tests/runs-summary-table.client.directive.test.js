'use strict';

describe('runsSummaryTable directive : ', function() {
  var scope,
      ctrl,
      getSummariesTenRes, // service
      mockgetSummariesTenRes = {}, // mock service
      table;

  // mockSummary contains the mock results we use for getSummariesTenRes
  beforeEach(module('mocks'));

  beforeEach(function() {
    module('runs');
    module(function($provide) {
      $provide.value('getSummariesTenRes', mockgetSummariesTenRes);
    });
  });

  beforeEach(inject(function($compile, $rootScope, mockSummaryJSON) {

    scope = $rootScope.$new();
    scope.runs = mockSummaryJSON;
    table = angular.element('<div class="table-responsive" data-runs-summary-table></div>');
    table = $compile(table)(scope);
    scope.$digest();

  }));


  it('should show a table', function(){
    var el = table;
    // make sure the table element is compiled
    expect(el.html()).toMatch(/^(<table)/);
  });

  it('should show marker times in minutes and seconds', function(){

    var firstKmTime = 331000;
    var timeConverted = new Date(firstKmTime);
    var mins = timeConverted.getMinutes();
    var seconds = timeConverted.getSeconds();
    var minsNSecs = mins + ':' + seconds;
    // match the first occurrence within the html
    expect(table.html()).toMatch(new RegExp('(' + minsNSecs + ')'));

  });



});
