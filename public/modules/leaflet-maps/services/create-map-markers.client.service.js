'use strict';
var setLeafletMapMarkers = function setLeafletMapMarkers() {

  return function(runStart, runEnd, summaryMarkerItems) {
    var markers = []; // the revealed markers
    var mapMarkerPrototype =
    {
      id : -1,
      meters : 0,
      coords : null,
      options : {
        clickable : false,
        draggable : false,
        keyboard : false
      }
    };

    // factory pattern for creating map marker items
    var setMarkerItem = function markerItem(options) {
      return angular.extend(Object.create(mapMarkerPrototype), options);
    };

    // Uses the factory and pushes produced marker items to the markers array
    var createMarkerItem = (function(markers, setMarkerItem) {
      var markerCounter = 0;

      return function(options) {
        var aMarker;
        options.id = markerCounter;
        aMarker = setMarkerItem(options);
        markers.push(aMarker);
        markerCounter =+ 1;
        return aMarker;
      };

    })(markers, setMarkerItem);


    // sets all map markers
    setMarkers(runStart, runEnd, summaryMarkerItems, createMarkerItem);
    return markers;


    // requires createMarkerItem()
    function setStartnEndMarkers(runStart, runEnd, createMarkerItem) {
      var starter =
        {
          coords : [runStart.latitude, runStart.longitude]
        };

      var finish =
      {
        coords : [runEnd.latitude, runEnd.longitude]
      };

      createMarkerItem(starter);
      createMarkerItem(finish);
    }


    // ----- Creating map markers using the summaries ----- //

    // params: markerItems An array of items to be made into markers
    function createMarkers(summaryMarkerItems) {
      summaryMarkerItems.forEach(function(markerItem) {
        var marker = {};
        marker.coords = [
          markerItem.coords.latitude,
          markerItem.coords.longitude
        ];
        marker.meters = markerItem.km * 1000;
        createMarkerItem(marker);
      });
    }

    // requires setStartnEndMarkers(), createMarkers()
    function setMarkers(runStart, runEnd, summaryMarkers, createMarkerItem) {
      setStartnEndMarkers(runStart, runEnd, createMarkerItem);
      createMarkers(summaryMarkers);
    }

  }; // returned function

}; // setMapMarkers



angular.module('leaflet-maps').factory('setLeafletMapMarkers', [setLeafletMapMarkers]);