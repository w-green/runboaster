'use strict';

var createChart = function($window) {

  return function(runs, rawElem, rawSvg, chartHeight) {

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
    var margin = 30; // pads the chart inside of the svg
    var lineColors = [
      '#B65020', // brown
      '#000', // blue
      '#ec6b60', // turquoise
      '#563D7C', // purple
      '#F4FD1F', // yellow
      '#EE5FF1', // violet pink
      '#F28483', // red
      '#6AF0D4', // violet green / blue
      '#2C4F53', // dark green
      '#3A4F56', // dark dark green
    ];
    var yAxisHeight = chartHeight - margin * 2;
    var svg = d3.select(rawSvg[0]);
    var runGroup = []; // used to group run path and circles (tool tips)
    var pathClass = 'path';
    var xScale, yScale, xAxisGen, yAxisGen, lineFun; // vars for paths generation
    var drawPaths;
    var resizeChart;
    var init;

    var chartContainerHeight;

    // ----- CHART WIDTH - RESPONSIVE ----- //
    var chartContainerWidth = 0;
    var getChartContainerWidth;
    var setChartContainerWidth;
    // this is from using bootstrap cols - they use 15px padding either side
    var chartContainerPadding = 30;
    var chartXAxisWidth;
    var getChartWidth;

    setChartContainerWidth = function setChartContainerWidth(wrapper) {
      chartContainerWidth = parseInt(wrapper.offsetWidth) - chartContainerPadding;
    };
    getChartContainerWidth = function getChartContainerWidth() {
      if(chartContainerWidth === 0) {
        setChartContainerWidth(rawElem);
      }
      return chartContainerWidth;
    };

    getChartWidth = function getChartWidth() {
      var containerWidth = getChartContainerWidth();
      return containerWidth - margin * 2;
    };

    setChartContainerWidth(rawElem);

    // ----- END CHART WIDTH - RESPONSIVE ----- //


    var chart = {
      margin : 20,
      axis : {
        y : {
          height : yAxisHeight, // default height
          lowest : getLowestYAxis()
        },
        x : {
          width : {
           get : getChartWidth
          },
          ticks : {
            count : markerCount,
            type : d3.time,
            interval : {
              measure : 'seconds',
              lapse : 30
            },
            format : '%M:%S'
          },
          orient : 'bottom'
        }
      },
      xScale : {
        type : d3.scale.linear(),
        domain : [1, markerCount],
        range : [50, getChartWidth()]
      },
      yScale : {
        type : d3.time.scale(),
        domain : [getLowestYAxis(), longestMarkerTime],
        range : [yAxisHeight, 0]
      },
      scatterplot : {
        circles : {
          radius : 3
        }
      }
    };

    init = (function init() {
      setChartParameters();
      drawAxis();
    }());

    resizeChart =
    function resizeChart() {
      setChartContainerWidth(rawElem);
      svg.attr('width', getChartContainerWidth());

      // Update range of scale with new width
      xScale.range([50, chart.axis.x.width.get()]);

      redrawAxis();
      redrawPaths();
    };


    drawPaths = (function drawPaths(data) {
      data.forEach(function(d, index, array) {
        // container for each path in line chart
        runGroup[index] = svg.append('g');
        runGroup[index]
          .attr('class', 'runLine vis-hidden run-' + index);

        // Draws the line
        runGroup[index]
          .append('svg:path')
          .attr({
            d: lineFun(d.markers),
            'stroke': lineColors[index],
            'stroke-width': 2,
            'fill': 'none',
            'class': pathClass + ' path' + index
          });

        // Add the scatterplot
        runGroup[index]
          .selectAll('dot')
          .data(d.markers)
            .enter()
            .append('circle')
              .attr('r', chart.scatterplot.circles.radius)
              .attr('cx', function(d) { return xScale(d.km); })
              .attr('cy', function(d) { return yScale(d.time); });
              // .on('mouseover', tip.show)
              // .on('mouseout', tip.hide);
      }); // data.forEach

    }(data)); // drawPaths


    // setting the values of the vars declared earlier
    function setChartParameters() {

      chartContainerHeight = chart.axis.y.height + margin * 2;

      // ----- set chart container height and width ----- //
      svg.attr('height', chartContainerHeight);
      svg.attr('width', getChartContainerWidth());

      xScale =
      chart.xScale.type
        .domain(chart.xScale.domain)
        .range(chart.xScale.range);

      yScale =
      chart.yScale.type
        .domain(chart.yScale.domain)
        .range(chart.yScale.range);

      xAxisGen =
      d3.svg.axis()
        .scale(xScale)
        .orient(chart.axis.x.orient)
        .tickSize(-chart.axis.y.height, 0, 0)
        .ticks(chart.axis.x.ticks.count);

      yAxisGen =
      d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickSize(-chart.axis.x.width.get(), 0, 0)
        .ticks(
          chart.axis.x.ticks.type[chart.axis.x.ticks.interval.measure],
          chart.axis.x.ticks.interval.lapse
        )
        .tickFormat(chart.axis.x.ticks.type.format(chart.axis.x.ticks.format));

      lineFun = d3.svg.line()
        .x(function (d) {
          return xScale(d.km);
        })
        .y(function (d) {
           return yScale(d.time);
        })
        .interpolate('linear');
    } // setChartParameters

    function drawAxis() {

      svg.append('svg:g')
        .attr('class', 'xAxis axis grid')
        .attr('transform', 'translate(0,' + chart.axis.y.height + ')')
        .call(xAxisGen)
        .append("text")
          .attr('class', 'xAxis__label')
          .attr("y", 20)
          .attr('x', getChartWidth() / 2)
          .attr("dy", "1em")
          .style("text-anchor", "end")
          .text("Distance (km)");

      svg.append('svg:g')
        .attr('class', 'yAxis axis grid')
        .attr('transform', 'translate(50, 0)')
        .call(yAxisGen)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Time");
    } // drawAxis


    // ----- Redraw axis on window resize ----- //
    function redrawAxis() {
      var x = svg.select('.xAxis');
      x.call(xAxisGen)
        .select('.xAxis__label')
          .attr("y", 20)
          .attr('x', getChartWidth() / 2)
          .attr("dy", "1em")
          .style("text-anchor", "end")
          .text("Distance (km)");

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

        // Add the scatterplot
        var runGroup = svg.select('g.run-' + index);
        var circle = runGroup.selectAll('circle');
        circle
          .attr('r', chart.scatterplot.circles.radius)
          .attr('cx', function(d) { return xScale(d.km); })
          .attr('cy', function(d) { return yScale(d.time); });
      });

    } // redrawPaths

    return {
      svg : svg,
      resizeChart : resizeChart
    };

  };

};

angular.module('charts').service('createChart', ['$window', createChart]);