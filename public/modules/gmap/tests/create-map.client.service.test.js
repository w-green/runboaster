'use strict';

describe('Create map service : ', function() {

  var map;

  beforeEach(function() {

    // create map module
    module('gmap');

    // mock modules
    module('mocks');

  });

  beforeEach(inject(function(mocksSingleRunData, runsSummaryMockService, createGmap) {
    var coords;
    var summaryMarkerItems;

    coords = mocksSingleRunData.features[0].geometry.coordinates;
    summaryMarkerItems = runsSummaryMockService.markerItems;

    // use mock data to instantiate map service
    map = createGmap(coords, summaryMarkerItems);

  }));


  it('should produce a gmap instance', function() {
    // expect gmap instance with polylines, markers, center and zoom
    expect(map.polylines).toBeDefined();
    expect(map.markers).toBeDefined();
    expect(map.center).toBeDefined();
    expect(map.zoom).toBeDefined();

  });


});
