'use strict';

describe('run summaries for map :', function() {
  var mockSumsLatest5Service, scope, ctrl, summariesEl, rootScope;

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
    rootScope = $rootScope;

    var summs =
    '<section data-map-summaries class="visible-lg-block">' +
      '<p>Select a run:</p>' +
      '<div ng-repeat="sum in summaries" data-activity-id="{{sum.activityId}}" data-list-order="{{sum.listOrder}}" class="mapSummaryItem" ng-class="{active: $index==0}">' +
        '<p><span class="label">Date:</span> {{sum.date}} </p>' +
        '<span class="icon fa fa-lg fa-fw fa-angle-right"></span>' +
        '<p><span class="label">Time:</span> {{sum.totalTime}}</p>' +
        '<p><span class="label">Distance:</span> {{sum.totalDistanceKm}} km</p>' +
      '</div>' +
    '</section>';

    summs = angular.element(summs);
    scope = $rootScope.$new();
    ctrl = $controller('MapSummaryCtrl', {$scope : scope});
    scope.setLatestSummaries(mockSumsLatest5Service);

    summariesEl = $compile(summs)(scope);
    scope.$digest();

  }));

  it('should generate the summaries based on our mock data', function() {
    expect(summariesEl.html()).toMatch(/(Aug 21, 2014 2:27)/);
  });

  it('first summary should be active when first loaded', function() {
    var firstSumm = summariesEl.find('div')[0];
    firstSumm = angular.element(firstSumm);

    expect(
      firstSumm
        .hasClass('active')
      )
      .toBe(true);
  });

  it('should change the active state to the selected summary', function() {

    var secondSumm = summariesEl.find('div')[1];
    var secondSummAng = angular.element(secondSumm);

    // used to test if click is
    // registered on para instead of div in template
    var secondSummP = secondSummAng.find('p')[0];

    // stub our event
    var evnt = {};
    evnt.target = secondSummP;
    scope.changeActiveMap(evnt);

    expect(
      secondSummAng
        .hasClass('active')
      )
      .toBe(true);
  });




});
