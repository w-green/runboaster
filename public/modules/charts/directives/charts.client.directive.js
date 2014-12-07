'use strict';

(function(lodash) {
  var _ = lodash;

  var lChart = function lChart($window, $filter, mediator) {

    return {

      restrict : 'AE',
      replace: true,
      template:'<div class="svgContainer col-xs-10"><svg id="lChart" class="svgChart"></svg></div>',
      link : function(scope, elem, attr){

        //  ----- Our Data ----- //
        var runs = scope.runs;
        var data = runs.runs;
        var markerSize = runs.markerSize;
        var longestMarkerTime = runs.longestMarkerTime;
        var shortestMarkerTime = runs.shortestMarkerTime;
        //  ----- END Our Data ----- //


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
        // ----- END Chart specific ----- //


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


        var redrawChart =
          function() {
            setChartWidth();
            // Update range of scale with new width
            xScale.range([50, chartWidth]);

            redrawAxis();
            redrawPaths();
          };


        var resizeEvent = mediator.subscribe('windowResize', redrawChart, this);



        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function() {
          mediator.unsubscribe(resizeEvent);
        });


        markerCount = d3.max(markerSize);

        // ----- Main drawAxis ----- //
        drawAxis();

/*
        // ----- Tooltip ----- //
        var div = svg.append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return 'KM: ' + d.km + '<br/>' + 'time: ' + d3.time.format('%M:%S')(new Date(d.time));
          });

        svg.call(tip);
        // ----- / Tooltip ----- //
*/
/*

        // use rect to capture mouse movements
        svg.append('rect')
          .attr('width', chartWidth)
          .attr('height', chartHeight)
          .attr('class', 'rectCaptMouse')
          .style('fill', 'none')
          .style('pointer-events', 'all')
          .on('mouseover', function() { focus.style('display', null); })
          .on('mouseout', function() { focus.style('display', 'none'); });
          // .on('mousemove', _.debounce(mousemove, 10));

        var = rectCaptMouse = d3.select('.rectCaptMouse');// document.querySelector('.rectCaptMouse');

        var focus = svg.append('g')
          .style('display', 'none')
          .attr('class', 'focus-group');

        focus.append('circle')
          .attr('class', 'y')
          .style('fill', 'none')
          .style('stroke', 'blue')
          .attr('r', 4);


        var bisectDate = d3.bisector(function(d) { return d.km; }).left;


        rectCaptMouse.on('mousemove', mousemove);

        var prevMousePos = null;
        function mousemove() {

          var mousePos = xScale.invert(d3.mouse(this)[0]); // x val mouse position without rounding
          var xValMousePos = Math.round(mousePos); // x val mouse position with rounding
          var indx = xValMousePos - 1;
          var results = [];

          if (xValMousePos !== prevMousePos) {
            prevMousePos = xValMousePos;
            results.length = 0;

            data.forEach(function(d, index, array) {
              var time = d.markers[indx].time;
              // console.log(time);
              results.push(time);
            });
            if (xValMousePos === 4) {
              console.log('YES' + results);
            }
          }

        } // mousemove

*/


        data.forEach(function(d, index, array) {
          //drawLines(d);

          runGroup[index] = svg.append('g');
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
          runGroup[index].selectAll('dot')
              .data(d.markers)
          .enter().append('circle')
              .attr('r', 5)
              .attr('cx', function(d) { return xScale(d.km); })
              .attr('cy', function(d) { return yScale(d.time); });
              // .on('mouseover', tip.show)
              // .on('mouseout', tip.hide);


        }); // data.forEach





        // Gets screen width of device
        function getScreenWidth() {
          var resolution = window.devicePixelRatio||screen.pixelDepth||screen.colorDepth;
          var clientWidth = document.documentElement.clientWidth;
          var deviceScreenWidth = clientWidth / resolution;
          return deviceScreenWidth;
        } // getScreenWidth


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
            .tickSize(-chartHeight, 0, 0)
            .ticks(markerCount);

          yAxisGen = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickSize(-chartWidth, 0, 0)
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
             .attr('class', 'xAxis axis grid')
             .attr('transform', 'translate(0,' + chartHeight + ')')
             .call(xAxisGen);

          svg.append('svg:g')
             .attr('class', 'yAxis axis grid')
             .attr('transform', 'translate(50, 0)')
             .call(yAxisGen);
        } // drawAxis


        // ----- Redraw axis on window resize ----- //
        function redrawAxis() {
          var x = svg.select('.xAxis');
          x.call(xAxisGen);

          yAxisGen = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickSize(-chartWidth, 0, 0)
            .ticks(d3.time.seconds, 30)
            .tickFormat(d3.time.format('%Mm %Ss'));


          var y = svg.select('.yAxis');
          y.call(yAxisGen);
        } // redrawAxis

        // ----- redraw the paths on window resize ----- //

        function redrawPaths() {
          data.forEach(function(d, index, array) {
            var runPath = svg.select('path.path' + index);
            runPath.attr({
                 'd': lineFun(d.markers)
             });
          });
        }

/*        // ----- On mouse hover tooltip ----- //
        var yLines = svg.selectAll('.yAxis');
        // yLines.on('mouseover', console.log('yes'));


        var vertLines = svg.selectAll('.yAxis > g.tick');
        console.log(vertLines);*/

      } // link
    }; // returned object

  }; // lChart

  angular.module('charts').directive('lChart', ['$window', '$filter', 'mediator', lChart]);

}(window._));
