'use strict';

describe('Create map polylines : ', function() {
  var polylines;

  beforeEach(function() {
    module('mocks');
    // polylines module
    module('gmap');
  });

  beforeEach(inject(function(mocksSingleRunData, setMapPolylines) {
    var coords;
    coords = mocksSingleRunData.features[0].geometry.coordinates;

    // polylines service initiated with mock data
    polylines = setMapPolylines(coords);

  }));

  it('should have polylines and paths defined', function(){
    // expect output of polylines
    expect(polylines.paths).toBeDefined();
    expect(polylines.polylines).toBeDefined();
  });

});
