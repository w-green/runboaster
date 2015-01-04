describe('runs maps controller', function() {

  describe('should change map', function() {
    var scope,
      rootScope,
      controller,
      mocksSingleRunData,
      mockSumsLatest5Service,
      jamesBond,
      anotherSpy,
      id = '531',
      orderNum = 1;

    beforeEach(function() {
      module('mocks');
      module('leaflet-maps');
      module('runs', function($provide) {
        $provide.value('getRunRes', {});
        $provide.value('getSummariesFiveRes', {});
      });
    });

    beforeEach(inject(function($rootScope, $controller, $q, createLeafletMap, getRunById, _mocksSingleRunData_, _mockSumsLatest5Service_) {
      rootScope = $rootScope;
      mockSumsLatest5Service = _mockSumsLatest5Service_;
      mocksSingleRunData = [_mocksSingleRunData_];

      jamesBond = spyOn(getRunById, 'get')
        .and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(mocksSingleRunData);
          return deferred.promise;
        });

      scope = rootScope.$new();
      controller = $controller('MyMapsCtrl', {$scope : scope, getRunRes : mocksSingleRunData, getSummariesFiveRes : mockSumsLatest5Service});
    }));

    // spy on the service to see if it has been called
    it('should call the getRunById service', function() {
      var selectedRun = scope.getNewMap(id, orderNum);
      rootScope.$apply();
      expect(jamesBond).toHaveBeenCalledWith(id);
    });

    it('should call the createLeafletMap service with run and summary', function() {
      var newMap;

      scope.getNewMap(id, orderNum)
        .then(function(map) {
          newMap = map;
        });
      rootScope.$apply();
      expect(newMap.polylines).toBeDefined();
    });

    it('should call getRunById when broadcasted event is received', function() {
      rootScope
        .$broadcast(
          'summarySelected',
          {
            'activityId' : id,
            'listOrder' : orderNum
          }
        );
      expect(jamesBond).toHaveBeenCalledWith(id);
    });


  });


});
