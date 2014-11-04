'use strict';

(function() {

  var lChart = function lChart($window, $filter) {

    return {

      restrict : 'E',
      // template:'<svg width="800" height="500"></svg>',
      template:'<div class="svgContainer col-sm-10"><svg class="svgChart" viewBox="0 0 800 500"></svg></div>',
      link : function(scope, elem, attr){

        var runs = scope.runs;
        var pathClass='path';
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;

        var getScreenWidth;
        var d3 = $window.d3;
        var rawSvg = elem.find('svg');
        var svg = d3.select(rawSvg[0]);
        var padding = 20; // pads the chart inside of the svg
        var chartWidth = 800 - padding;
        var chartHeight = 500 - padding;

        var data = runs.runs;
        var markerSize = runs.markerSize;
        var longestMarkerTime = runs.longestMarkerTime;
        var shortestMarkerTime = runs.shortestMarkerTime;

        var xAxis_base;
        var markerCount;
        var runGroup = []; // used to group run path and circles


        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

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


        data.forEach(function(d, index, array) {
          //drawLines(d);

          runGroup[index] = svg.append("g");
          runGroup[index].attr('class', 'runLine vis-hidden run-' + index);

          runGroup[index].append('svg:path')
             .attr({
                 d: lineFun(d.markers),
                 'stroke': getRandomColor(),
                 'stroke-width': 2,
                 'fill': 'none',
                 'class': pathClass
             });


          // Add the scatterplot
          runGroup[index].selectAll("dot")
              .data(d.markers)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return xScale(d.km); })
              .attr("cy", function(d) { return yScale(d.time); })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide)
        });


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
            .ticks(d3.time.seconds, 30)
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
             .attr('transform', 'translate(0,' + chartHeight + ')')
             .call(xAxisGen);

          svg.append('svg:g')
             .attr('class', 'y axis')
             .attr('transform', 'translate(50, 0)')
             .call(yAxisGen);
        } // drawAxis

      } // link
    }; // returned object

  }; // lChart

  angular.module('charts').directive('lChart', ['$window', '$filter', lChart]);

}());
