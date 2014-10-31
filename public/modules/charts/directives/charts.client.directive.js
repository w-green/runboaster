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






        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        createDataOb();
        markerCount = d3.max(markerSize);
        drawAxis();

        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return 'KM: ' + d.km + "<br/>" + 'time: ' + d3.time.format("%M:%S")(new Date(d.time)) ;
            // return div.html('KM: ' + d.km + "<br/>" + 'time: ' + d3.time.format("%M:%S")(new Date(d.time)) );
            // return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
          });

        svg.call(tip);

        data.forEach(function(d) {
          drawLines(d);


          // Add the scatterplot
          svg.selectAll("dot")
              .data(d.markers)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return xScale(d.km); })
              .attr("cy", function(d) { return yScale(d.time); })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide)
        });

/*          // Add the scatterplot
          svg.selectAll("dot")
              .data(d.markers)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return xScale(d.km); })
              .attr("cy", function(d) { return yScale(d.time); })
              .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  // div.html(formatTime(d.time) + "<br/>"  + d.km)
                  div.html('KM: ' + d.km + "<br/>" + 'time: ' + d3.time.format("%M:%S")(new Date(d.time)) )
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
        });*/


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
