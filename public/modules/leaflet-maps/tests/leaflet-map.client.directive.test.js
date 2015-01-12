
'use strict';

(function(lodash) {
  var _ = lodash;

  describe('leaflet map directive', function() {
    var scope,
      controller,
      mapEl,
      mockSumsLatest5Service,
      mocksSingleRunData,
      mocksSingleRunData2,
      spy;

    beforeEach(function() {
      module('mocks');
      module('leaflet-maps');
      module('runs', function($provide) {
        $provide.value('getRunRes', {});
        $provide.value('getSummariesFiveRes', {});
      });
    });

    beforeEach(inject(function($rootScope, $controller, $compile, $q, _mocksSingleRunData_, _mocksSingleRunData2_, _mockSumsLatest5Service_, getRunById) {
      scope = $rootScope.$new();
      mockSumsLatest5Service = _mockSumsLatest5Service_;
      mocksSingleRunData = [_mocksSingleRunData_];
      mocksSingleRunData2 = [_mocksSingleRunData2_];

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

    it('should use the same map layer when we call the change map with the same run as previous', inject(function($q, getRunById) {
      // Check the current layer
      var currentLayer = scope.getCurrentLayerGroup;
      var originalLayerCoord;
      var isItOriginalLayerCoord;

      // store a latLng of one of the coords from original run
      for(var m in currentLayer()._layers) {
        originalLayerCoord = currentLayer()._layers[m]._latlng;
        return;
      }

      // console.log(originalLayerCoord);
      // stub out getRunById
      spy = spyOn(getRunById, 'get')
        .and.callFake(function() {
          var defer = $q.defer();
          defer.resolve(mocksSingleRunData2);
          return defer.promise;
        });

      // Change the map using the spy above
      scope.changeMap({}, {activityId : '1', listOrder : 0});

      // call scope apply to settle the promise on scope.getNewMap
      scope.$apply();

      // Test to see if the same coords are used
      isItOriginalLayerCoord = false;
      for(var l in currentLayer()._layers) {
        var tester = _.contains(currentLayer()._layers[l]._latlng, originalLayerCoord.lat);

        if(tester === true) {
          isItOriginalLayerCoord = true;
          continue;
        }
      }

      expect(isItOriginalLayerCoord).toBeTruthy();

    }));

    it('should have diff map layer when we change the map', inject(function($q, getRunById) {
      // Check the current layer
      var currentLayer = scope.getCurrentLayerGroup;
      var originalLayerCoord;
      var isItOriginalLayerCoord;

      // store a latLng of one of the coords from original run
      for(var m in currentLayer()._layers) {
        originalLayerCoord = currentLayer()._layers[m]._latlng;
        return;
      }

      // stub out getRunById
      spy = spyOn(getRunById, 'get')
        .and.callFake(function() {
          var defer = $q.defer();
          defer.resolve(mocksSingleRunData2);
          return defer.promise;
        });

      // Change the map using the spy above
      scope.changeMap({}, {activityId : '1', listOrder : 2});

      // call scope apply to settle the promise on scope.getNewMap
      scope.$apply();

      // Test to see if the same coords are used
      isItOriginalLayerCoord = false;
      for(var n in currentLayer()._layers) {
        var tester = _.contains(currentLayer()._layers[n]._latlng, originalLayerCoord.lat);

        if(tester === true) {
          isItOriginalLayerCoord = true;
          continue;
        }
      }

      expect(isItOriginalLayerCoord).toBeFalsy();

    }));



    it('should check if the map has a given layer', inject(function($q, getRunById) {

      var currentLayer = scope.getCurrentLayerGroup();
      var mapHasLayer = scope.mapHasLayer(currentLayer);
      expect(mapHasLayer).toBeTruthy();

    }));

    it('should remove the previous layer from the map when we change runs', inject(function($q, getRunById) {

      var previousLayer = (function() {return scope.getCurrentLayerGroup();})();
      var mapHasLayer;

      mapHasLayer = scope.mapHasLayer(previousLayer);
      expect(mapHasLayer).toBeTruthy();

      // stub out getRunById
      spy = spyOn(getRunById, 'get')
        .and.callFake(function() {
          var defer = $q.defer();
          defer.resolve(mocksSingleRunData2);
          return defer.promise;
        });

      // Change the map using the spy above
      scope.changeMap({}, {activityId : '1', listOrder : 1});

      var newMapHasLayer = scope.mapHasLayer(previousLayer);
      expect(newMapHasLayer).toBeFalsy();

    }));

  });

}(window._));
