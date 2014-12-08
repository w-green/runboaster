'use strict';

(function(lodash) {
  var _ = lodash;

  var lineChart = function lineChart($window, $filter, mediator, createChart) {

    return {

      restrict : 'AE',
      replace: true,
      template:'<div class="svgContainer col-xs-10"><svg id="lChart" class="svgChart"></svg></div>',
      link : function(scope, elem, attr){

        //  ----- Our Data ----- //
        var runs = scope.runs;
        var rawSvg = elem.find('svg');
        var chartHeight = 360; // in px
        var chart = createChart(runs, elem[0], rawSvg, chartHeight); // returns an object

        var resizeEvent = mediator.subscribe('windowResize', chart.resizeChart, this);

        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function() {
          mediator.unsubscribe(resizeEvent);
        });


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

/*        // ----- On mouse hover tooltip ----- //
        var yLines = svg.selectAll('.yAxis');
        // yLines.on('mouseover', console.log('yes'));


        var vertLines = svg.selectAll('.yAxis > g.tick');
        console.log(vertLines);*/

      } // link
    }; // returned object

  }; // lChart

  angular.module('charts').directive('lineChart', ['$window', '$filter', 'mediator', 'createChart', lineChart]);

}(window._));
