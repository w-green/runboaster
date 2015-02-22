'use strict';

(function() {

  var createSingleLineChart = function($window) {
    return function createSingleLineChart(getRunRes, runSumm, rawElem, rawSvg) {

      var d3 = $window.d3;
      var run = getRunRes;
      var summ = runSumm;

      var margin = {top: 20, right: 20, bottom: 20, left: 20};
      var chartHeight = 368; // same size as map on dashboard when you add 40px margin
      var yAxisHeight = chartHeight - margin.top - margin.bottom;
      var chartContainerHeight;

      // ----- CHART WIDTH - RESPONSIVE ----- //
      var chartContainerWidth = 0;
      var getChartContainerWidth;
      var setChartContainerWidth;
      // this is from using bootstrap cols - they use 15px padding either side
      var chartContainerPadding = 30;
      var getChartWidth;
      var resizeChart;

      setChartContainerWidth = function setChartContainerWidth(wrapper) {
        chartContainerWidth = parseInt(wrapper.offsetWidth);
      };

      getChartContainerWidth = function getChartContainerWidth() {
        if(chartContainerWidth === 0) {
          setChartContainerWidth(rawElem);
        }
        return chartContainerWidth;
      };

      getChartWidth = function getChartWidth() {
        var containerWidth = getChartContainerWidth();
        return containerWidth - margin.left - margin.right;
      };

      setChartContainerWidth(rawElem);


      // ----- END CHART WIDTH - RESPONSIVE ----- //


      // set x axis range
      var x = d3.time.scale()
          .range([0, getChartWidth()]);

      // set y axis range
      var y = d3.scale.linear()
          .range([yAxisHeight, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          .ticks(
            d3.time.minute,
            2
          )
          .tickFormat(d3.time.format('%M'));

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');


      var line = d3.svg.line()
          .x(function(d) { return x(d.time); })
          .y(function(d) { return y(d.altitude); });

      chartContainerHeight = chartHeight + margin.top + margin.bottom;

      // var svg = d3.select('body').append('svg')
      var svg = d3.select(rawSvg)
        // .attr('width', getChartWidth() + margin.left + margin.right)
        .attr('width',  getChartContainerWidth())
        .attr('height', chartContainerHeight);

      var svgAxis =
      svg
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var startTime = new Date(run[0][0][3]);

      var data = [];

      setData(run);
      function setData(coords) {

        coords.forEach(function(coord, i) {
          var set = i;

          coord.map(function(d, i) {
            var runData = {};
            var currentTime = new Date(d[3]);
            var newTime = currentTime - startTime;

            runData.altitude = d[2];
            runData.time = newTime;

            data.push(runData);

          });
        });
      }

      // so there is an array whose values are objects.
      // These objects are the x values and the y values

      x.domain(d3.extent(data, function(d) { return d.time; }));
      y.domain(d3.extent(data, function(d) { return d.altitude; }));

      svgAxis.append('g')
          .attr('class', 'xAxis axis')
          .attr('transform', 'translate(0,' + yAxisHeight + ')')
          .call(xAxis)
        .append('text')
          .attr('y', 20)
          .attr('x', getChartWidth() / 2)
          .attr('dy', '1em')
          .style('text-anchor', 'end')
          .text('Time (mins)');

      svgAxis.append('g')
          .attr('class', 'yAxis axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Altitude');

      svgAxis.append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line)
          .attr('stroke', 'blue')
          .attr('stroke-width', 2)
          .attr('fill', 'none');


      resizeChart =
      function resizeChart() {
        setChartContainerWidth(rawElem);
        svg.attr('width', getChartContainerWidth());
        // Update range of scale with new width
        x.range([0, getChartWidth()]);
        // xScale.range([50, chart.axis.x.width.get()]);

        var xAxisGen = svg.select('.xAxis');
        xAxisGen.call(xAxis);

        var runPath = svg.select('.line');
        runPath.attr({
             'd': line(data)
         });

      };

      return {
        resizeChart : resizeChart
      };

    }; // returned function
  };

  angular.module('charts').service('createSingleLineChart', ['$window', createSingleLineChart]);

})();
