// NEED TO MAKE THIS RESPONSIVE

'use strict';

(function(lodash) {
  var _ = lodash;

  var lChart = function lChart($window, $filter) {

    return {

      restrict : 'E',
      // template:'<svg width="800" height="500"></svg>',
      // template:'<div class="svgContainer col-sm-10"><svg class="svgChart" viewBox="0 0 800 500"></svg></div>',
      template:'<div class="svgContainer col-xs-10"><svg id="lChart" class="svgChart"></svg></div>',
      link : function(scope, elem, attr){

        //  ----- Our Data ----- //
        var runs = scope.runs;
        var data = scope.runs.runs;
        var markerSize = runs.markerSize;
        var longestMarkerTime = runs.longestMarkerTime;
        var shortestMarkerTime = runs.shortestMarkerTime;
        //  ----- / Our Data ----- //


        // ----- Chart specific ----- //
        var d3 = $window.d3;
        var rawSvg = elem.find('svg');
        var svg = d3.select(rawSvg[0]);
        var xAxis_base;
        var markerCount;
        var runGroup = []; // used to group run path and circles
        var pathClass='path';
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;
        var margin = 20; // pads the chart inside of the svg
        var chartWidth;
        var chartHeight = 360 - margin*2;
        // ----- / Chart specific ----- //


        // ----- set chart height and width ----- //
        svg.attr('height', chartHeight + margin*2);
        setChartWidth();


        // param : DOM node
        // returns parent width
        function setChartWidth() {
          var margin = 20; // chart margin
          var newChartWidth;
          var pWidth;

          function getParentNodeWidth() {
            var el = document.getElementById('lChart');
            var parent = el.parentNode;
            var pWidth = parseInt(parent.offsetWidth);
            return pWidth;
          }
          pWidth = getParentNodeWidth();
          newChartWidth = pWidth - margin * 2;
          chartWidth = newChartWidth;
          svg.attr('width', pWidth);
        }


        window.onresize = _.debounce(function(){
          setChartWidth();
          // ----- Update range of scale with new width ----- //
          xScale.range([50, chartWidth]);

          // svg.select('.x axis').call(xAxisGen);
          redrawAxis();
          redrawPaths();
        }, 150);


        // ----- Tooltip ----- //
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        markerCount = d3.max(markerSize);

        // ----- Main drawAxis ----- //
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
        // ----- / Tooltip ----- //


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
                 'class': pathClass + ' path' + index
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



        // Gets screen width of device
        function getScreenWidth() {
          var resolution = window.devicePixelRatio||screen.pixelDepth||screen.colorDepth;
          var clientWidth = document.documentElement.clientWidth;
          var deviceScreenWidth = clientWidth / resolution;
          return deviceScreenWidth;
        }; // getScreenWidth


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
             .attr('class', 'xAxis axis')
             .attr('transform', 'translate(0,' + chartHeight + ')')
             .call(xAxisGen);

          svg.append('svg:g')
             .attr('class', 'yAxis axis')
             .attr('transform', 'translate(50, 0)')
             .call(yAxisGen);
        } // drawAxis


        // ----- Redraw axis on window resize ----- //
        function redrawAxis() {
          var y = svg.select('.xAxis');
          y.call(xAxisGen);
        } // redrawAxis

        // ----- redraw the paths on window resize ----- //

        function redrawPaths() {
          data.forEach(function(d, index, array) {
            var line = svg.select('path.path' + index);
            line.attr({
                 'd': lineFun(d.markers)
             });
          });
        }

      } // link
    }; // returned object

  }; // lChart

  angular.module('charts').directive('lChart', ['$window', '$filter', lChart]);

}(window._));
