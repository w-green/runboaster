'use strict';

describe('format summaries : ', function() {
  var summaries, $rootScope;

  beforeEach(function() {
    module('runs');
    module('mocks');
  });

  beforeEach(inject(function(_$rootScope_, formatSummaries, unformattedSummary) {
    $rootScope = _$rootScope_;
    summaries = formatSummaries(unformattedSummary);

  }));

  it('summaries should have a longestMarkerTime', function(){
    var result;
    summaries.then(function(d) {
      result = d;
    });
    $rootScope.$digest();
    expect(result.longestMarkerTime).toBeDefined();
  });

  it('should return 10 summary marker items', function(){
    var result;
    summaries.then(function(d) {
      result = d;
    });
    $rootScope.$digest();
    expect(result.runs.length).toEqual(10);
  });


});
