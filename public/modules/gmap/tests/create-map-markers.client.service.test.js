'use strict';

describe('Create map markers : ', function() {
  var runStart, runEnd, summaryMarkerItems, markers;

  beforeEach(function() {
    module('gmap');
    module('mocks');
  });

  beforeEach(inject(function(setMapMarkers, runsSummaryMockService) {

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
    // console.log(summaryMarkerItems);
    markers = setMapMarkers(runStart, runEnd, summaryMarkerItems);

  }));


  it('should return a list of markers', function() {
    expect(markers.length).toEqual(8);
  });



});
