'use strict';

(function() {

  var lChart = function lChart($window, $filter) {

    return {

      restrict : 'E',
      template:'<svg width="800" height="500"></svg>',
      link : function(scope, elem, attr){

        var runs = scope.runs;
        var pathClass='path';
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;

        var getScreenWidth;
        var d3 = $window.d3;
        var rawSvg = elem.find('svg');
        var svg = d3.select(rawSvg[0]);
        var padding = 20; // pads the chart inside of the svg
        var chartWidth = rawSvg.attr('width') - padding;
        var chartHeight = rawSvg.attr('height') - padding;
        var data = [];
        var markerSize = [];
        var longestMarkerTime = 0;
        var shortestMarkerTime = 0;
        var xAxis_base;
        var markerCount;




        createDataOb();
        markerCount = d3.max(markerSize);
        drawAxis();
        data.forEach(function(d) {
          drawLines(d);
        });


        /*  // the data layout produced from createDataOb()
          var data = [
            markers : [ {km : 1, time : 291000}, {km : 2, time : 332000}, {km : 3, time : 332000} ],  startTime: "2014-08-07T20:23:56.000Z", totalDistance: 6.51, totalTime: 1854000},
            markers : [ {km : 1, time : 291000}, {km : 2, time : 332000}, {km : 3, time : 332000} ],  startTime: "2014-08-07T20:23:56.000Z", totalDistance: 6.51, totalTime: 1854000},
            etc...
          ]
        */

        function createDataOb() {
          runs.forEach(function(run) {
            var markersLen;
            var runData = {};
            runData.markers = [];

            markersLen = run.markerItems.length;
            markerSize.push(markersLen);

            runData.startTime = run.startTime;
            run.markerItems.forEach(function(marker) {
              if(shortestMarkerTime === 0) {
               shortestMarkerTime = marker.totalTime;
              } else {
                if(marker.totalTime < shortestMarkerTime) {
                  shortestMarkerTime = marker.totalTime;
                }
              }
              if (marker.totalTime > longestMarkerTime) {
                longestMarkerTime = marker.totalTime;
              }

/*              console.log('totalTime = ' + marker.totalTime);
              var timeMinSec = $filter('date')(marker.totalTime, 'm:ss');
              console.log('timeMinSec = ' + timeMinSec);*/

              var markerData = {
                km : marker.km,
                time : marker.totalTime
              };
              runData.markers.push(markerData);
            });
            runData.totalDistance = run.totalDistanceKm;
            runData.totalTime = run.totalTime;
            data.push(runData);
          });

        } //createDataOb


        /*
        // Gets screen width of device
        getScreenWidth = function getScreenWidth() {
          var resolution = window.devicePixelRatio||screen.pixelDepth||screen.colorDepth;
          var clientWidth = document.documentElement.clientWidth;
          var screenWidth;
          deviceScreenWidth = clientWidth / resolution;
          return deviceScreenWidth;
        }; // getScreenWidth
        */


        // setting the values of the vars declared earlier
        function setChartParameters() {

          if (shortestMarkerTime !== 0) {
            xAxis_base = shortestMarkerTime / 1.1;
          }

          xScale = d3.scale.linear()
            .domain([1, markerCount])
            .range([50, chartWidth]);

          yScale = d3.time.scale()
            .domain([xAxis_base, longestMarkerTime])
            .range([chartHeight, 0]);

          xAxisGen = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .ticks(markerCount);

          yAxisGen = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(d3.time.seconds, 15)
            .tickFormat(d3.time.format('%Mm %Ss'));
            // .ticks(5);

          lineFun = d3.svg.line()
            .x(function (d) {
              return xScale(d.km);
            })
            .y(function (d) {
               return yScale(d.time);
            })
            .interpolate('linear');
        } // setChartParameters

        // utility function for generating path colours
        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        } // getRandomColor

        function drawAxis() {
          setChartParameters();

          svg.append('svg:g')
             .attr('class', 'x axis')
             .attr('transform', 'translate(0, 470)')
             .call(xAxisGen);

          svg.append('svg:g')
             .attr('class', 'y axis')
             .attr('transform', 'translate(45,0)')
             .call(yAxisGen);
        } // drawAxis

        function drawLines(d) {
          svg.append('svg:path')
             .attr({
                 d: lineFun(d.markers),
                 'stroke': getRandomColor(),
                 'stroke-width': 2,
                 'fill': 'none',
                 'class': pathClass
             });
        } // drawLines
      } // link
    }; // returned object

  }; // lChart

  angular.module('charts').directive('lChart', ['$window', '$filter', lChart]);

}());
