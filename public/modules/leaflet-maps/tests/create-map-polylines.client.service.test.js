'use strict';

describe('Create map polylines : ', function() {
  var polylines;

  beforeEach(function() {
    module('mocks');
    module('leaflet-maps');
  });

  beforeEach(inject(function(mocksSingleRunData, setLeafletMapPolylines) {
    var coords;
    coords = mocksSingleRunData.features[0].geometry.coordinates;

    // polylines service initiated with mock data
    polylines = setLeafletMapPolylines(coords);

  }));

  it('should have polylines and paths defined', function(){
    expect(polylines[0][0][0]).toEqual(jasmine.any(Number));
  });

});
