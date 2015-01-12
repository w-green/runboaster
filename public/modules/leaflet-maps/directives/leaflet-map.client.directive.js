'use strict';

(function(leaflet, lodash) {

  var L = leaflet;
  var _ = lodash;

  var leafletMap = function(setLeafletMapPolylines, createLeafletMap) {

    return {
      restrict : 'AE',
      replace : false,
      link : function(scope, elem, attr) {
        var mapData = scope.LMap;
        var iconClass = 'leaflet-map__marker-icons';
        var currentLayerGroup = null;

        scope.mapContainer = L.map(elem[0], {});
        scope.setMapData = setMapData;
        scope.mapHasLayer = function(layer) {
          return scope.mapContainer.hasLayer(layer);
        };

        scope.getCurrentLayerGroup = function(){
          return currentLayerGroup;
        };

        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: 'Map data &copy;',
            maxZoom: 18,
          })
          .addTo(scope.mapContainer);

        function setMapData(mapData) {
          var bounds;
          var polylines;
          var markers;

          if(currentLayerGroup !== null) {
            scope.mapContainer.removeLayer(currentLayerGroup);
          }

          bounds = setBounds(mapData);
          scope.mapContainer.fitBounds(bounds);
          polylines = setPolylines(mapData);
          markers = setMarkers(mapData);
          currentLayerGroup = L.layerGroup(markers)
            .addLayer(polylines);
          currentLayerGroup.addTo(scope.mapContainer);

        }

        function setBounds(mapData) {
          var boundsMarkers = [];

          boundsMarkers = _.pluck(mapData.markers, 'coords');
          return boundsMarkers;
        }

        function setPolylines(mapData) {
          return L.multiPolyline(mapData.polylines, {color: 'red'});
        }

        function setMarkers(mapData) {
          var mapMarkers = [];

          // add start marker
          mapMarkers.push(createMarkerIcon(mapData.markers[0], 'START', 'leaflet-map__marker-icons--start'));

          // add finish marker
          mapMarkers.push(createMarkerIcon(mapData.markers[1], 'FINISH', 'leaflet-map__marker-icons--finish'));

          // add other markers
          mapData.markers
            .filter(function(marker, i, arry) {
              return marker.meters > 0;
            })
            .forEach(function(marker, i) {
              var title = (marker.meters / 1000) + ' km';
              mapMarkers.push(createMarkerIcon(marker, title));
            });

          return mapMarkers;

        }

        function createMarkerIcon(marker, title, extraClass) {
          var iconClassNames = extraClass === undefined ? iconClass : iconClass + ' ' + extraClass;
          var customIcon = L.divIcon({
            className : iconClassNames,
            html : '<span>' + title + '</span>'
          });

          marker.options.icon = customIcon;

          return L.marker(marker.coords, marker.options);
        }

        // if map data changes recreate map
        scope.$watch('LMap', createMap);

        function createMap(mapData) {
          setMapData(mapData);
        }

        scope.$on('destroy', function() {
          mapData = null;
          scope.mapContainer = null;
        });

      } // link


    };

  };

  angular.module('leaflet-maps').directive('leafletMap',['setLeafletMapPolylines', 'createLeafletMap', leafletMap]);
})(window.L, window._);


