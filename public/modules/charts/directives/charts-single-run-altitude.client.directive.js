'use strict';
var lineChartAltitude = function(createSingleLineChart, mediator) {

  return {

    restrict :  'A',
    replace : true,
    template:'<div class="svgContainer"><svg id="chart--altitude" class="svgChart"></svg></div>',
    link : function(scope, elem, attr) {

      var run = scope.run;
      var rawSvg = elem.find('svg')[0];
      // var chartHeight = 360; // in px
      var chart = createSingleLineChart(run, elem[0], rawSvg);

      var resizeEvent = mediator.subscribe('windowResize', chart.resizeChart, this);

      // ----- remove event listener when scope is destroyed ----- //
      scope.$on('$destroy', function() {
        mediator.unsubscribe(resizeEvent);
      });

    }

  };

};


angular.module('charts').directive('lineChartAltitude', ['createSingleLineChart', 'mediator', lineChartAltitude]);