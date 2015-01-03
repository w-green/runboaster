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
        var boundsMarkers = [];
        var iconClass = 'leaflet-map__marker-icons';

        scope.mapContainer = L.map(elem[0], {});

        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: 'Map data &copy;',
            maxZoom: 18,
          })
          .addTo(scope.mapContainer);

        boundsMarkers = _.pluck(mapData.markers, 'coords');

        // add bounds
        scope.mapContainer.fitBounds(boundsMarkers);

        // add polylines
        L.multiPolyline(mapData.polylines, {color: 'red'})
          .addTo(scope.mapContainer);

        // add start marker
        createMarkerIcon(mapData.markers[0], 'START', 'leaflet-map__marker-icons--start')
          .addTo(scope.mapContainer);

        // add finish marker
        createMarkerIcon(mapData.markers[1], 'FINISH', 'leaflet-map__marker-icons--finish')
          .addTo(scope.mapContainer);

        // add other markers
        mapData.markers
          .filter(function(marker, i, arry) {
            return marker.meters > 0;
          })
          .forEach(function(marker, i) {
            var title = (marker.meters / 1000) + ' km';
            createMarkerIcon(marker, title)
              .addTo(scope.mapContainer);
          });


        function createMarkerIcon(marker, title, extraClass) {
          var iconClassNames = extraClass === undefined ? iconClass : iconClass + ' ' + extraClass;
          var customIcon = L.divIcon({
            className : iconClassNames,
            html : '<span>' + title + '</span>'
          });

          marker.options.icon = customIcon;

          return L.marker(marker.coords, marker.options);
        }

      } // link


    };

  };

  angular.module('leaflet-maps').directive('leafletMap',['setLeafletMapPolylines', 'createLeafletMap', leafletMap]);
})(window.L, window._);