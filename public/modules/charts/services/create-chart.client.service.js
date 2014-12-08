'use strict';

var createChart = function($window) {

  return function(runs, elem, rawSvg) {

    var d3 = $window.d3;
    var data = runs.runs;
    var markerCount = d3.max(runs.markerSize); // highest marker
    var longestMarkerTime = runs.longestMarkerTime;
    var shortestMarkerTime = runs.shortestMarkerTime;
    var getLowestYAxis = function getLowestYAxis() {
      var lowestYAxisPoint;
      if (shortestMarkerTime !== 0) {
        lowestYAxisPoint = shortestMarkerTime / 1.1;
      }
      else {
        lowestYAxisPoint = 0;
      }
      return lowestYAxisPoint;
    };

    var svg = d3.select(rawSvg[0]);
    var runGroup = []; // used to group run path and circles (tool tips)
    var pathClass = 'path';
    var xScale, yScale, xAxisGen, yAxisGen, lineFun; // vars for paths generation
    var margin = 20; // pads the chart inside of the svg

    // ----- CHART WIDTH - RESPONSIVE ----- //
    var chartContainerWidth = 0;
    var getChartContainerWidth;
    var setChartContainerWidth;
    var chartXAxisWidth;

    setChartContainerWidth = function setChartContainerWidth(wrapper) {
      chartContainerWidth = parseInt(wrapper.offsetWidth);
    };
    getChartContainerWidth = function getChartContainerWidth() {
      console.log('YES');
      if(chartContainerWidth === 0) {
        setChartContainerWidth(elem);
      }
      return chartContainerWidth;
    };

    setChartContainerWidth(elem);

    // ----- END CHART WIDTH - RESPONSIVE ----- //

    var chart = {
      margin : 20,
      axis : {
        y : {
          height : 360, // default height
          lowest : getLowestYAxis()
        },
        x : {
          width : {
           get : function() {
            var containerWidth = getChartContainerWidth();
            return containerWidth - margin * 2;
           }
          },
          // width : 300,
          ticks : {
            count : markerCount
          }
        }
      },


    };


    var chartContainerHeight = chart.axis.y.height + margin * 2;


    // ----- set chart container height and width ----- //
    svg.attr('height', chartContainerHeight);
    svg.attr('width', getChartContainerWidth());


    setChartParameters();
    drawAxis();


    var resizeChart =
      function resizeChart() {
        setChartContainerWidth(elem);
        svg.attr('width', getChartContainerWidth());

        // Update range of scale with new width
        xScale.range([50, chart.axis.x.width.get()]);

        redrawAxis();
        redrawPaths();
      };


    data.forEach(function(d, index, array) {

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







    // setting the values of the vars declared earlier
    function setChartParameters() {

      // if (shortestMarkerTime !== 0) {
      //   xAxis_base = shortestMarkerTime / 1.1;
      // }

      xScale = d3.scale.linear()
        .domain([1, chart.axis.x.ticks.count])
        .range([50, chart.axis.x.width.get()]);

      yScale = d3.time.scale()
        .domain([chart.axis.y.lowest, longestMarkerTime])
        .range([chart.axis.y.height, 0]);

      xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickSize(-chart.axis.y.height, 0, 0)
        .ticks(chart.axis.x.ticks.count);

      yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickSize(-chart.axis.x.width.get(), 0, 0)
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

      svg.append('svg:g')
         .attr('class', 'xAxis axis grid')
         // .attr('transform', 'translate(0,' + chartHeight + ')')
         .attr('transform', 'translate(0,' + chart.axis.y.height + ')')
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
        // .tickSize(-chartWidth, 0, 0)
        .tickSize(-chart.axis.x.width.get(), 0, 0)
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



    return {
      resizeChart : resizeChart
    };

  };

};

angular.module('charts').service('createChart', ['$window', createChart]);