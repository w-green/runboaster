'use strict';

describe('Create custom chart : ', function() {
var chart, svg, elem;

  beforeEach(function() {
    module('charts');
    module('mocks');
  });

  beforeEach(inject(function(createChart, mockLatest10Summaries) {

    elem =
    angular
      .element('<div class="svgContainer col-xs-10"><svg id="lChart" class="svgChart"></svg></div>');

    var runs = mockLatest10Summaries;
    var rawSvg = elem.find('svg');
    var chartHeight = 360; // in px
    chart = createChart(runs, elem[0], rawSvg, chartHeight); // returns an object
    svg = chart.svg[0][0];

  }));

  it('should return the svg canvas', function() {
    expect(chart.svg).toBeDefined();
  });

  it('should have a default height of 360', function(){
    var height = svg.height;
    expect(height.baseVal.value).toEqual(360);
  });

  it('should have ten run lines', function(){
    var lines = chart.svg.selectAll('g.runLine');
    expect(lines[0].length).toEqual(10);
  });

  it('should resize chart', function(){

    var container = elem;
    // container.css('width', '1000px');
    // console.log(container.offsetWidth)
    chart.resizeChart();
    var lines = chart.svg.selectAll('g.runLine');
    expect(lines[0].length).toEqual(10);

  });


});
