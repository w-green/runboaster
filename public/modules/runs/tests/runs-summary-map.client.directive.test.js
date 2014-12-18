'use strict';

describe('Gmap directive for click events :', function() {
  var mockSumsLatest5Service, scope, ctrl, summariesEl;

  beforeEach(function() {
    module('mocks'); // our Mock data
    module('runs');
    // stubs for resolved functions.
    // otherwise an error is thrown as they have no providers
    module(function($provide) {
      $provide.value('lastSummaryRes', {});
      $provide.value('getSummariesFiveRes', []);
    });
  });

  beforeEach(inject(function($controller, $rootScope, $compile, _mockSumsLatest5Service_) {
    mockSumsLatest5Service = _mockSumsLatest5Service_;

    var summs =
    '<section data-map-summaries>' +
      '<p>Your run summaries:</p>' +
      '<div ng-repeat="sum in summaries" data-activity-id="{{sum.activityId}}" data-list-order="{{sum.listOrder}}" class="mapSummaryItem">' +
        '<p>Date: {{sum.date}} </p>' +
        '<p>Time: {{sum.totalTime}}</p>' +
        '<p>Distance: {{sum.totalDistanceKm}} km</p>' +
      '</div>' +
    '</section>';

    summs = angular.element(summs);
    scope = $rootScope.$new();
    ctrl = $controller('MapSummaryCtrl', {$scope : scope});
    scope.setLatestSummaries(mockSumsLatest5Service);

    summariesEl = $compile(summs)(scope);
    scope.$digest();

  }));

  it('should generate the summaries based on our mock data', function(){
    // match activity id from mock data
    expect(summariesEl.html()).toMatch(/(Date: Aug 21, 2014 2:27:42 PM)/);
  });

});
