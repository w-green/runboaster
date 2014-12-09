'use strict';

describe('Charts data selector directive : ', function() {
  var scope, ctrl, elem;

  beforeEach(function() {
    module('charts');
    module('mocks');
    module(function($provide) {
      $provide.value('runsSummariesRes', {});
    });
  });

  beforeEach(inject(function($controller, $compile, $rootScope, mockLatest10Summaries) {
    elem = document.createElement('chart-data-selector');
    document.body.appendChild(elem);

    scope = $rootScope.$new();
    $controller('chartsCtrl', {$scope : scope});
    scope.runs = mockLatest10Summaries;

    elem = $compile(elem)(scope);
    scope.$digest();

  }));


  it('should render a list of the runs', function() {
    expect(elem.children(0).hasClass('chart--dataselector')).toBe(true);
  });


});
