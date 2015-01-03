'use strict';

describe('Create map markers : ', function() {
  var runStart, runEnd, summaryMarkerItems, markers;

  beforeEach(function() {
    module('leaflet-maps');
    module('mocks');
  });

  beforeEach(inject(function(setLeafletMapMarkers, runsSummaryMockService) {

    // runStart, runEnd, summaryMarkerItems
    //
    runStart =
      {
        'latitude': 51.45974,
        'longitude': -0.222839
      };

    runEnd =
      {
        'latitude': 51.459758,
        'longitude': -0.222963
      };

    summaryMarkerItems = runsSummaryMockService.markerItems;
    markers = setLeafletMapMarkers(runStart, runEnd, summaryMarkerItems);

  }));


  it('should return a list of markers', function() {
    expect(markers.length).toEqual(8);
  });

  it('should create a single marker item with coords and options', function() {
    expect(markers[0].coords).toBeDefined();
    expect(markers[0].coords[0]).toEqual(51.45974);
    expect(markers[0].options.draggable).toBe(false);
  });



});
