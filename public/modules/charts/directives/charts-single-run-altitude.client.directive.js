'use strict';

// createChart is the same one used in charts area
var lineChartAltitude = function(createSingleLineChart, createChart, mediator) {

  return {

    restrict :  'A',
    replace : true,
    template:'<div class="svgContainer"><svg id="chart--altitude" class="svgChart"></svg></div>',
    link : function(scope, elem, attr) {

      var run = scope.run;
      var summ = scope.summ;
      var rawSvg = elem.find('svg')[0];

      // var chartHeight = 360; // in px
      var chart = createSingleLineChart(run, summ, elem[0], rawSvg);
      // runs, rawElem, rawSvg, chartHeight
      var otherChart = createChart(summ, elem[0], rawSvg, 500);


      var resizeEvent = mediator.subscribe('windowResize', chart.resizeChart, this);

      // ----- remove event listener when scope is destroyed ----- //
      scope.$on('$destroy', function() {
        mediator.unsubscribe(resizeEvent);
      });

    }

  };

};


angular.module('charts').directive('lineChartAltitude', ['createSingleLineChart', 'createChart', 'mediator', lineChartAltitude]);
