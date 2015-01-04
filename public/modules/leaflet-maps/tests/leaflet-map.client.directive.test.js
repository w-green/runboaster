describe('leaflet map directive', function() {
  var scope,
    controller,
    mapEl,
    mockSumsLatest5Service,
    mocksSingleRunData;

  beforeEach(function() {
    module('mocks');
    module('leaflet-maps');
    module('runs', function($provide) {
      $provide.value('getRunRes', {});
      $provide.value('getSummariesFiveRes', {});
    });
  });

  beforeEach(inject(function($rootScope, $controller, $compile, _mocksSingleRunData_, _mockSumsLatest5Service_) {
    scope = $rootScope.$new();
    mockSumsLatest5Service = _mockSumsLatest5Service_;
    mocksSingleRunData = [_mocksSingleRunData_];

    mapEl = angular.element('<div id="map" class="leaflet-map" data-leaflet-map></div>');
    controller = $controller('MyMapsCtrl', {$scope : scope, getRunRes : mocksSingleRunData, getSummariesFiveRes : mockSumsLatest5Service});
    mapEl = $compile(mapEl)(scope);
    $rootScope.$apply();
  }));


  it('should display a leaflet map with marker icon', function() {
    expect(mapEl.html()).toMatch('leaflet-marker-icon');
  });

  it('should display a leaflet map with a path', function() {
    expect(mapEl.html()).toMatch(/(path)/);
  });
});
