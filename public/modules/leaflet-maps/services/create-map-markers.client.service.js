'use strict';
var setLeafletMapMarkers = function setLeafletMapMarkers() {

  return function(runStart, runEnd, summaryMarkerItems) {
    var markers = []; // the revealed markers
    var mapMarkerPrototype =
    {
      id : -1,
      coords : null,
      options : {
        labelContent : '',
        draggable : false
      },
      icon : '/styles/img/maps/1x1pxtransparent.png'
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
      };

    })(markers, setMarkerItem);


    // sets all map markers
    setMarkers(runStart, runEnd, summaryMarkerItems, createMarkerItem);
    return markers;


    // requires createMarkerItem()
    function setStartnEndMarkers(runStart, runEnd, createMarkerItem) {
      var starter =
        {
          coords : runStart,
          options : {
            labelContent : 'START',
          }
        };

      var finish =
      {
        coords : runEnd,
        options : {
          labelContent : 'FINISH',
        }
      };

      createMarkerItem(starter);
      createMarkerItem(finish);
    }


    // ----- Creating map markers using the summaries ----- //

    // params: markerItems An array of items to be made into markers
    function createMarkers(summaryMarkerItems) {
      summaryMarkerItems.forEach(function(markerItem) {
        var marker = {};
        marker.coords = {
          latitude : markerItem.coords.latitude,
          longitude : markerItem.coords.longitude
        };
        marker.options = {
          labelContent : markerItem.km + '<br />km'
        };
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