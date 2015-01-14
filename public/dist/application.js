'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var apiVersion = '1_0_0';
    var applicationModuleName = 'runningApp';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    var config = {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
      };
    Object.defineProperty(config, 'apiVersion', {
      value: apiVersion,
      configurable: false,
      enumerable: true,
      writable: false
    });
    Object.freeze(config);
    return config;
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('c3-charts', ['runs']);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('charts', [
  'runs',
  'customCore',
  'mediator',
  'data-selector'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
ApplicationConfiguration.registerModule('customCore', [
  'ui.router',
  'mediator'
]);'use strict';
// Use Applicaion configuration module to register a new module
// ApplicationConfiguration.registerModule('dashboard', ['ngResource', 'runs', 'ui.router', 'uiGmapgoogle-maps', 'gmap', 'users', 'charts', 'mediator']);
ApplicationConfiguration.registerModule('dashboard', [
  'ngResource',
  'runs',
  'ui.router',
  'users',
  'charts',
  'mediator'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('data-selector');'use strict';
ApplicationConfiguration.registerModule('leaflet-maps');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('mediator');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('runs', [
  'ngResource',
  'ui.router',
  'users',
  'charts',
  'leaflet-maps'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('left-nav', [
  'customCore',
  'mediator'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('top-nav', ['charts']);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('upload-data', [
  'angularFileUpload',
  'ngResource',
  'ui.router'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
    Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('c3-charts').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('c3-charts', {
      url: '/runs/charts/c3',
      resolve: {
        runsSummariesRes: [
          'getSummaries',
          'formatSummaries',
          function (getSummaries, formatSummaries) {
            var queryOptions = { limit: 10 };
            // format the summs for the charts
            var formattedSumms = getSummaries.get(queryOptions).then(function (d) {
                return formatSummaries(d);
              });
            return formattedSumms;
          }
        ]
      },
      templateUrl: 'modules/c3-charts/views/c3-line-chart.client.view.html',
      controller: 'C3ChartsCtrl'
    });
  }
]);'use strict';
(function (d3, c3) {
  var C3ChartsCtrl = function c3ChartsCtrl($scope, runsSummariesRes) {
    $scope.runs = runsSummariesRes;
    var runs = [];
    var allRuns = $scope.runs.runs;
    allRuns.forEach(function (run, index, array) {
      var aRun = [];
      aRun.push(run.startTime);
      run.markers.forEach(function (marker) {
        var timeAsString = marker.time;
        var time = d3.time.format('%M.%S')(new Date(timeAsString));
        aRun.push(timeAsString);
      });
      runs.push(aRun);
    });
    var chart = c3.generate({
        bindto: '#c3-chart',
        data: { columns: runs },
        grid: {
          x: { show: true },
          y: { show: true }
        },
        tooltip: {
          format: {
            value: function (value) {
              var x;
              x = d3.time.format('%M:%S')(new Date(value));
              return x;
            }
          }
        },
        axis: {
          y: {
            show: true,
            type: 'timeseries',
            ticks: {
              time: {
                value: 'seconds',
                interval: 30
              }
            },
            tick: { format: d3.time.format('%Mm %Ss') }
          }
        }
      });
  };
  angular.module('c3-charts').controller('C3ChartsCtrl', [
    '$scope',
    'runsSummariesRes',
    C3ChartsCtrl
  ]);
}(window.d3, window.c3));'use strict';
angular.module('charts').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('charts', {
      url: '/runs/charts/custom',
      resolve: {
        getSummariesTenRes: [
          'getSummaries',
          'formatSummaries',
          function (getSummaries, formatSummaries) {
            var queryOptions = { limit: 10 };
            // format the summs for d3
            var formattedSumms = getSummaries.get(queryOptions).then(function (d) {
                return formatSummaries(d);
              });
            return formattedSumms;
          }
        ]
      },
      templateUrl: 'modules/charts/views/charts.client.view.html',
      controller: 'chartsCtrl'
    });
  }
]);'use strict';
(function () {
  var chartsCtrl = function chartsCtrl($scope, getSummariesTenRes) {
    $scope.runs = getSummariesTenRes;
  };
  angular.module('charts').controller('chartsCtrl', [
    '$scope',
    'getSummariesTenRes',
    chartsCtrl
  ]);
}(window._));'use strict';
(function () {
  var chartDataSelector = function chartDataSelector($window, $filter, addListItem, toggleData, setHeightAftrTopNav, mediator) {
    return {
      restrict: 'AE',
      replace: 'true',
      template: '<div class="dataselector"></div>',
      link: function (scope, elem, attr) {
        var data = scope.runs.runs;
        var d3 = $window.d3;
        // The list of runs from which you can select to show on chart
        var chartDataSelectorList = document.createElement('ul');
        // add Select All item
        var listItemSelectRun = {
            parentListElement: chartDataSelectorList,
            anchorElement: { textContent: 'Select your run' },
            classNm: 'select-run'
          };
        // add Select All item
        var listItemSelectAll = {
            parentListElement: chartDataSelectorList,
            anchorElement: { textContent: 'All runs' },
            classNm: 'run-all inactive'
          };
        addListItem(listItemSelectRun);
        // Add all of the data selector list items to chartDataSelectorList
        data.forEach(function (d, index, array) {
          var startDate = d3.time.format('%a %b %e %Y')(new Date(d.startTime));
          var selectorListItem = {
              parentListElement: chartDataSelectorList,
              anchorElement: { textContent: startDate },
              classNm: 'run-' + index + ' inactive'
            };
          addListItem(selectorListItem);
        });
        addListItem(listItemSelectAll);
        elem.append(chartDataSelectorList);
        // ----- set the height for scrolling ----- //
        setHeightAftrTopNav(elem[0]);
        elem.on('click', toggleData);
        // ----- add event listener on window resize ----- //
        var resetHeight = function resetHeight() {
          var element = elem[0];
          setHeightAftrTopNav(element);
        };
        var resizeEvent = mediator.subscribe('windowResize', resetHeight, this);
        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function () {
          mediator.unsubscribe(resizeEvent);
        });
      }  // link
    };  // returned object
  };
  // chartDataSelector
  angular.module('charts').directive('chartDataSelector', [
    '$window',
    '$filter',
    'addListItem',
    'toggleData',
    'setHeightAftrTopNav',
    'mediator',
    chartDataSelector
  ]);
}());'use strict';
// createChart is the same one used in charts area
var lineChartAltitude = function (createSingleLineChart, createChart, mediator) {
  return {
    restrict: 'A',
    replace: true,
    template: '<div class="svgContainer"><svg id="chart--altitude" class="svgChart"></svg></div>',
    link: function (scope, elem, attr) {
      var run = scope.run;
      var summ = scope.summ;
      var rawSvg = elem.find('svg')[0];
      // var chartHeight = 360; // in px
      var chart = createSingleLineChart(run, summ, elem[0], rawSvg);
      // runs, rawElem, rawSvg, chartHeight
      var otherChart = createChart(summ, elem[0], rawSvg, 500);
      var resizeEvent = mediator.subscribe('windowResize', chart.resizeChart, this);
      // ----- remove event listener when scope is destroyed ----- //
      scope.$on('$destroy', function () {
        mediator.unsubscribe(resizeEvent);
      });
    }
  };
};
angular.module('charts').directive('lineChartAltitude', [
  'createSingleLineChart',
  'createChart',
  'mediator',
  lineChartAltitude
]);  // 'use strict';
     // var lineChartAltitude = function(createSingleLineChart, mediator) {
     //   return {
     //     restrict :  'A',
     //     replace : true,
     //     template:'<div class="svgContainer"><svg id="chart--altitude" class="svgChart"></svg></div>',
     //     link : function(scope, elem, attr) {
     //       var run = scope.run;
     //       var rawSvg = elem.find('svg')[0];
     //       // var chartHeight = 360; // in px
     //       var chart = createSingleLineChart(run, elem[0], rawSvg);
     //       var resizeEvent = mediator.subscribe('windowResize', chart.resizeChart, this);
     //       // ----- remove event listener when scope is destroyed ----- //
     //       scope.$on('$destroy', function() {
     //         mediator.unsubscribe(resizeEvent);
     //       });
     //     }
     //   };
     // };
     // angular.module('charts').directive('lineChartAltitude', ['createSingleLineChart', 'mediator', lineChartAltitude]);
'use strict';
(function (lodash) {
  var _ = lodash;
  var lineChart = function lineChart($window, $filter, mediator, createChart) {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="svgContainer col-lg-11"><svg id="lChart" class="svgChart"></svg></div>',
      link: function (scope, elem, attr) {
        //  ----- Our Data ----- //
        var runs = scope.runs;
        var rawSvg = elem.find('svg');
        var chartHeight = 360;
        // in px
        var chart = createChart(runs, elem[0], rawSvg, chartHeight);
        // returns an object
        var resizeEvent = mediator.subscribe('windowResize', chart.resizeChart, this);
        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function () {
          mediator.unsubscribe(resizeEvent);
        });  /*
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
      }  // link
    };  // returned object
  };
  // lChart
  angular.module('charts').directive('lineChart', [
    '$window',
    '$filter',
    'mediator',
    'createChart',
    lineChart
  ]);
}(window._));'use strict';
(function () {
  var createSingleLineChart = function ($window) {
    return function createSingleLineChart(getRunRes, runSumm, rawElem, rawSvg) {
      var d3 = $window.d3;
      var run = getRunRes;
      var summ = runSumm;
      var margin = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        };
      var chartHeight = 368;
      // same size as map on dashboard when you add 40px margin
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
        if (chartContainerWidth === 0) {
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
      var x = d3.time.scale().range([
          0,
          getChartWidth()
        ]);
      // set y axis range
      var y = d3.scale.linear().range([
          yAxisHeight,
          0
        ]);
      var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(d3.time.minute, 2).tickFormat(d3.time.format('%M'));
      var yAxis = d3.svg.axis().scale(y).orient('left');
      var line = d3.svg.line().x(function (d) {
          return x(d.time);
        }).y(function (d) {
          return y(d.altitude);
        });
      chartContainerHeight = chartHeight + margin.top + margin.bottom;
      // var svg = d3.select('body').append('svg')
      var svg = d3.select(rawSvg).attr('width', getChartContainerWidth()).attr('height', chartContainerHeight);
      var svgAxis = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      var startTime = new Date(run[0][0][3]);
      var data = [];
      setData(run);
      function setData(coords) {
        coords.forEach(function (coord, i) {
          var set = i;
          coord.map(function (d, i) {
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
      x.domain(d3.extent(data, function (d) {
        return d.time;
      }));
      y.domain(d3.extent(data, function (d) {
        return d.altitude;
      }));
      svgAxis.append('g').attr('class', 'xAxis axis').attr('transform', 'translate(0,' + yAxisHeight + ')').call(xAxis).append('text').attr('y', 20).attr('x', getChartWidth() / 2).attr('dy', '1em').style('text-anchor', 'end').text('Time (mins)');
      svgAxis.append('g').attr('class', 'yAxis axis').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Altitude');
      svgAxis.append('path').datum(data).attr('class', 'line').attr('d', line).attr('stroke', 'blue').attr('stroke-width', 2).attr('fill', 'none');
      resizeChart = function resizeChart() {
        setChartContainerWidth(rawElem);
        svg.attr('width', getChartContainerWidth());
        // Update range of scale with new width
        x.range([
          0,
          getChartWidth()
        ]);
        // xScale.range([50, chart.axis.x.width.get()]);
        var xAxisGen = svg.select('.xAxis');
        xAxisGen.call(xAxis);
        var runPath = svg.select('.line');
        runPath.attr({ 'd': line(data) });
      };
      return { resizeChart: resizeChart };
    };  // returned function
  };
  angular.module('charts').service('createSingleLineChart', [
    '$window',
    createSingleLineChart
  ]);
}());  // 'use strict';
       // (function() {
       //   var createSingleLineChart = function($window) {
       //     return function createSingleLineChart(getRunRes, rawElem, rawSvg) {
       //       var d3 = $window.d3;
       //       var run = getRunRes;
       //       var margin = {top: 20, right: 20, bottom: 20, left: 20};
       //       var chartHeight = 368; // same size as map on dashboard when you add 40px margin
       //       var yAxisHeight = chartHeight - margin.top - margin.bottom;
       //       var chartContainerHeight;
       //       // ----- CHART WIDTH - RESPONSIVE ----- //
       //       var chartContainerWidth = 0;
       //       var getChartContainerWidth;
       //       var setChartContainerWidth;
       //       // this is from using bootstrap cols - they use 15px padding either side
       //       var chartContainerPadding = 30;
       //       var getChartWidth;
       //       var resizeChart;
       //       setChartContainerWidth = function setChartContainerWidth(wrapper) {
       //         chartContainerWidth = parseInt(wrapper.offsetWidth);
       //       };
       //       getChartContainerWidth = function getChartContainerWidth() {
       //         if(chartContainerWidth === 0) {
       //           setChartContainerWidth(rawElem);
       //         }
       //         return chartContainerWidth;
       //       };
       //       getChartWidth = function getChartWidth() {
       //         var containerWidth = getChartContainerWidth();
       //         return containerWidth - margin.left - margin.right;
       //       };
       //       setChartContainerWidth(rawElem);
       //       // ----- END CHART WIDTH - RESPONSIVE ----- //
       //       // set x axis range
       //       var x = d3.time.scale()
       //           .range([0, getChartWidth()]);
       //       // set y axis range
       //       var y = d3.scale.linear()
       //           .range([yAxisHeight, 0]);
       //       var xAxis = d3.svg.axis()
       //           .scale(x)
       //           .orient('bottom')
       //           .ticks(
       //             d3.time.minute,
       //             2
       //           )
       //           .tickFormat(d3.time.format('%M'));
       //       var yAxis = d3.svg.axis()
       //           .scale(y)
       //           .orient('left');
       //       var line = d3.svg.line()
       //           .x(function(d) { return x(d.time); })
       //           .y(function(d) { return y(d.altitude); });
       //       chartContainerHeight = chartHeight + margin.top + margin.bottom;
       //       // var svg = d3.select('body').append('svg')
       //       var svg = d3.select(rawSvg)
       //         // .attr('width', getChartWidth() + margin.left + margin.right)
       //         .attr('width',  getChartContainerWidth())
       //         .attr('height', chartContainerHeight);
       //       var svgAxis =
       //       svg
       //         .append('g')
       //           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
       //       var startTime = new Date(run[0][0][3]);
       //       var data = [];
       //       setData(run);
       //       function setData(coords) {
       //         coords.forEach(function(coord, i) {
       //           var set = i;
       //           coord.map(function(d, i) {
       //             var runData = {};
       //             var currentTime = new Date(d[3]);
       //             var newTime = currentTime - startTime;
       //             runData.altitude = d[2];
       //             runData.time = newTime;
       //             data.push(runData);
       //           });
       //         });
       //       }
       //       // so there is an array whose values are objects.
       //       // These objects are the x values and the y values
       //       x.domain(d3.extent(data, function(d) { return d.time; }));
       //       y.domain(d3.extent(data, function(d) { return d.altitude; }));
       //       svgAxis.append('g')
       //           .attr('class', 'xAxis axis')
       //           .attr('transform', 'translate(0,' + yAxisHeight + ')')
       //           .call(xAxis)
       //         .append('text')
       //           .attr('y', 20)
       //           .attr('x', getChartWidth() / 2)
       //           .attr('dy', '1em')
       //           .style('text-anchor', 'end')
       //           .text('Time (mins)');
       //       svgAxis.append('g')
       //           .attr('class', 'yAxis axis')
       //           .call(yAxis)
       //         .append('text')
       //           .attr('transform', 'rotate(-90)')
       //           .attr('y', 6)
       //           .attr('dy', '.71em')
       //           .style('text-anchor', 'end')
       //           .text('Altitude');
       //       svgAxis.append('path')
       //           .datum(data)
       //           .attr('class', 'line')
       //           .attr('d', line)
       //           .attr('stroke', 'blue')
       //           .attr('stroke-width', 2)
       //           .attr('fill', 'none');
       //       resizeChart =
       //       function resizeChart() {
       //         setChartContainerWidth(rawElem);
       //         svg.attr('width', getChartContainerWidth());
       //         // Update range of scale with new width
       //         x.range([0, getChartWidth()]);
       //         // xScale.range([50, chart.axis.x.width.get()]);
       //         var xAxisGen = svg.select('.xAxis');
       //         xAxisGen.call(xAxis);
       //         var runPath = svg.select('.line');
       //         runPath.attr({
       //              'd': line(data)
       //          });
       //       };
       //       return {
       //         resizeChart : resizeChart
       //       };
       //     }; // returned function
       //   };
       //   angular.module('charts').service('createSingleLineChart', ['$window', createSingleLineChart]);
       // })();
'use strict';
var createChart = function ($window) {
  return function (runs, rawElem, rawSvg, chartHeight) {
    var d3 = $window.d3;
    var data = runs.runs;
    var markerCount;
    console.log(data);
    if (runs.markerSize) {
      markerCount = d3.max(runs.markerSize);  // highest marker
    } else {
      markerCount = data.markerItems.length;
    }
    console.log(markerCount);
    var longestMarkerTime = runs.longestMarkerTime;
    var shortestMarkerTime = runs.shortestMarkerTime;
    var getLowestYAxis = function getLowestYAxis() {
      var lowestYAxisPoint;
      if (shortestMarkerTime !== 0) {
        lowestYAxisPoint = shortestMarkerTime / 1.1;
      } else {
        lowestYAxisPoint = 0;
      }
      return lowestYAxisPoint;
    };
    var margin = 30;
    // pads the chart inside of the svg
    var lineColors = [
        '#F4FD1F',
        '#F0FFF0',
        '#6AF0D4',
        '#2AB21B',
        '#ec6b60',
        '#B65020',
        '#EE5FF1',
        '#563D7C',
        '#F28483',
        '#3A4F56'
      ];
    var yAxisHeight = chartHeight - margin * 2;
    var svg = d3.select(rawSvg[0]);
    var runGroup = [];
    // used to group run path and circles (tool tips)
    var pathClass = 'path';
    var xScale, yScale, xAxisGen, yAxisGen, lineFun;
    // vars for paths generation
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
      if (chartContainerWidth === 0) {
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
        margin: 20,
        axis: {
          y: {
            height: yAxisHeight,
            lowest: getLowestYAxis()
          },
          x: {
            width: { get: getChartWidth },
            ticks: {
              count: markerCount,
              type: d3.time,
              interval: {
                measure: 'seconds',
                lapse: 30
              },
              format: '%M:%S'
            },
            orient: 'bottom'
          }
        },
        xScale: {
          type: d3.scale.linear(),
          domain: [
            1,
            markerCount
          ],
          range: [
            50,
            getChartWidth()
          ]
        },
        yScale: {
          type: d3.time.scale(),
          domain: [
            getLowestYAxis(),
            longestMarkerTime
          ],
          range: [
            yAxisHeight,
            0
          ]
        },
        scatterplot: {
          circles: {
            radius: 5,
            border: {
              size: 1,
              color: '#FFF'
            }
          }
        }
      };
    init = function init() {
      setChartParameters();
      drawAxis();
    }();
    resizeChart = function resizeChart() {
      setChartContainerWidth(rawElem);
      svg.attr('width', getChartContainerWidth());
      // Update range of scale with new width
      xScale.range([
        50,
        chart.axis.x.width.get()
      ]);
      redrawAxis();
      redrawPaths();
    };
    drawPaths = function drawPaths(data) {
      data.forEach(function (d, index, array) {
        // container for each path in line chart
        runGroup[index] = svg.append('g');
        runGroup[index].attr('class', 'runLine vis-hidden run-' + index);
        // Draws the line
        runGroup[index].append('svg:path').attr({
          d: lineFun(d.markers),
          'stroke': lineColors[index],
          'stroke-width': 2,
          'fill': 'none',
          'class': pathClass + ' path' + index
        });
        // Add the scatterplot
        runGroup[index].selectAll('dot').data(d.markers).enter().append('circle').attr('r', chart.scatterplot.circles.radius).attr('stroke', chart.scatterplot.circles.border.color).attr('stroke-width', chart.scatterplot.circles.border.size).attr('cx', function (d) {
          return xScale(d.km);
        }).attr('cy', function (d) {
          return yScale(d.time);
        });  // .on('mouseover', tip.show)
             // .on('mouseout', tip.hide);
      });  // data.forEach
    }(data);
    // drawPaths
    // setting the values of the vars declared earlier
    function setChartParameters() {
      chartContainerHeight = chart.axis.y.height + margin * 2;
      // ----- set chart container height and width ----- //
      svg.attr('height', chartContainerHeight);
      svg.attr('width', getChartContainerWidth());
      xScale = chart.xScale.type.domain(chart.xScale.domain).range(chart.xScale.range);
      yScale = chart.yScale.type.domain(chart.yScale.domain).range(chart.yScale.range);
      xAxisGen = d3.svg.axis().scale(xScale).orient(chart.axis.x.orient).tickSize(-chart.axis.y.height, 0, 0).ticks(chart.axis.x.ticks.count);
      yAxisGen = d3.svg.axis().scale(yScale).orient('left').tickSize(-chart.axis.x.width.get(), 0, 0).ticks(chart.axis.x.ticks.type[chart.axis.x.ticks.interval.measure], chart.axis.x.ticks.interval.lapse).tickFormat(chart.axis.x.ticks.type.format(chart.axis.x.ticks.format));
      lineFun = d3.svg.line().x(function (d) {
        return xScale(d.km);
      }).y(function (d) {
        return yScale(d.time);
      }).interpolate('linear');
    }
    // setChartParameters
    function drawAxis() {
      svg.append('svg:g').attr('class', 'xAxis axis grid').attr('transform', 'translate(0,' + chart.axis.y.height + ')').call(xAxisGen).append('text').attr('class', 'xAxis__label').attr('y', 20).attr('x', getChartWidth() / 2).attr('dy', '1em').style('text-anchor', 'end').text('Distance (km)');
      svg.append('svg:g').attr('class', 'yAxis axis grid').attr('transform', 'translate(50, 0)').call(yAxisGen).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Pace');
    }
    // drawAxis
    // ----- Redraw axis on window resize ----- //
    function redrawAxis() {
      var x = svg.select('.xAxis');
      x.call(xAxisGen).select('.xAxis__label').attr('y', 20).attr('x', getChartWidth() / 2).attr('dy', '1em').style('text-anchor', 'end').text('Distance (km)');
      yAxisGen = d3.svg.axis().scale(yScale).orient('left').tickSize(-chart.axis.x.width.get(), 0, 0).ticks(d3.time.seconds, 30).tickFormat(d3.time.format('%Mm %Ss'));
      var y = svg.select('.yAxis');
      y.call(yAxisGen);
    }
    // redrawAxis
    // ----- redraw the paths on window resize ----- //
    function redrawPaths() {
      data.forEach(function (d, index, array) {
        var runPath = svg.select('path.path' + index);
        runPath.attr({ 'd': lineFun(d.markers) });
        // Add the scatterplot
        var runGroup = svg.select('g.run-' + index);
        var circle = runGroup.selectAll('circle');
        circle.attr('r', chart.scatterplot.circles.radius).attr('cx', function (d) {
          return xScale(d.km);
        }).attr('cy', function (d) {
          return yScale(d.time);
        });
      });
    }
    // redrawPaths
    return {
      svg: svg,
      resizeChart: resizeChart
    };
  };
};
angular.module('charts').service('createChart', [
  '$window',
  createChart
]);'use strict';
(function (lunar) {
  var toggleData = function () {
    var allRunsSelect = false;
    return function toggleData(event) {
      // ----- toggles chart lines and background colours in dataselector ----- //
      var e = event;
      var el = angular.element(e.target.parentNode);
      var runNum = el.attr('class').split(' ')[0];
      var runClass;
      if (runNum === 'run-all') {
        toggleAllRuns();
      } else {
        // add active state to dataselector item
        el.toggleClass('inactive');
        runClass = 'g.' + runNum;
        // show path of selected run
        showRunInChart(runClass);
      }
      function showRunInChart(runClass) {
        var path = document.querySelector(runClass + ' path');
        var pathGroup = path.parentNode;
        var isHidden = lunar.hasClass(pathGroup, 'vis-hidden');
        var canIuseSVGAnimation;
        // make hidden and return a
        function toggleHidden(run) {
          lunar.toggleClass(run, 'vis-hidden');
        }
        toggleHidden(pathGroup);
        if (!isHidden) {
          return;
        }
        canIuseSVGAnimation = function () {
          return 'transition' in path.style;
        }();
        if (canIuseSVGAnimation) {
          var PathLength = path.getTotalLength();
          // Clear any previous transition
          path.style.transition = path.style.WebkitTransition = 'none';
          // Set up the starting positions
          path.style.strokeDasharray = PathLength + ' ' + PathLength;
          path.style.strokeDashoffset = PathLength;
          // Trigger a layout so styles are calculated & the browser
          // picks up the starting position before animating
          path.getBoundingClientRect();
          // Define our transition
          path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
          // Go!
          path.style.strokeDashoffset = '0';
        }
      }
      // toggle visibility of all chart lines.
      // Also toggle dataselector background colours for all runs
      function toggleAllRuns() {
        var allRunsNodeList = document.querySelectorAll('.runLine');
        var toggleAClass;
        allRunsSelect = !allRunsSelect;
        if (allRunsSelect === false) {
          toggleAClass = function (element, classNm) {
            element.addClass(classNm);
          };
        } else {
          toggleAClass = function (element, classNm) {
            element.removeClass(classNm);
          };
        }
        toggleGraphRuns();
        toggleAllSelectorItems();
        function toggleGraphRuns() {
          var allRunsArray = function () {
              var result = [];
              for (var i = 0; i < allRunsNodeList.length; i++) {
                result[i] = allRunsNodeList[i];
              }
              return result;
            }();
          allRunsArray.forEach(function (run, index, array) {
            var aRun = angular.element(run);
            toggleAClass(aRun, 'vis-hidden');
          });
        }
        // toggleGraphRuns
        function toggleAllSelectorItems() {
          var selectorListItems = document.querySelectorAll('.dataselector-list li');
          var aListItem;
          var allSelectorsArray = function () {
              var result = [];
              for (var i = 0; i < selectorListItems.length; i++) {
                result[i] = selectorListItems[i];
              }
              return result;
            }();
          allSelectorsArray.forEach(function (listItem, index, array) {
            aListItem = angular.element(listItem);
            toggleAClass(aListItem, 'inactive');
          });
        }  // toggleAllSelectorItems
      }  // toggleAllRuns
    };  // return
  };
  // var toggleData
  angular.module('charts').factory('toggleData', [toggleData]);
}(window.lunar));'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
var routes = function routes($stateProvider) {
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'modules/custom-core/views/about.client.view.html'
  }).state('welcome', {
    url: '/welcome',
    templateUrl: 'modules/custom-core/views/welcome.client.view.html'
  });
};
angular.module('customCore').config([
  '$stateProvider',
  routes
]);'use strict';
var body = function body($location, Authentication) {
  return {
    restrict: 'A',
    replace: false,
    link: function link(scope, elem, attr) {
      var aboutRegex;
      var currentUrl;
      scope.aboutState = false;
      scope.authentication = Authentication;
      aboutRegex = new RegExp('/about');
      function checkState() {
        currentUrl = $location.url();
        scope.aboutState = aboutRegex.test(currentUrl);
      }
      scope.$on('$stateChangeSuccess', function () {
        checkState();
      });
    }
  };
};
angular.module('customCore').directive('body', [
  '$location',
  'Authentication',
  body
]);'use strict';
var mainContent = function (mediator, setHeightAftrTopNav) {
  return {
    restrict: 'C',
    link: function (scope, elem, attr) {
      // ----- set the height for scrolling ----- //
      setHeightAftrTopNav(elem[0]);
      // ----- add event listener on window resize ----- //
      // adding to scope for testability
      scope.resetHeight = function resetHeight() {
        setHeightAftrTopNav(elem[0]);
      };
      var resizeEvent = mediator.subscribe('windowResize', scope.resetHeight, this);
      // ----- remove event listener when scope is destroyed ----- //
      scope.$on('$destroy', function () {
        mediator.unsubscribe(resizeEvent);
      });
    }
  };
};
angular.module('customCore').directive('mainContent', [
  'mediator',
  'setHeightAftrTopNav',
  mainContent
]);'use strict';
// Used in navigation, main content, charts dataselector to give
// height to vertical scrolling items
(function () {
  var setHeightAftrTopNav = function setHeightAftrTopNav() {
    return function (elem) {
      var htmlEl;
      var topNav;
      setElHeight(elem);
      function setElHeight(elem) {
        htmlEl = document.querySelector('html');
        topNav = document.getElementById('top-nav-js') || '';
        var htmlHeight = htmlEl.clientHeight;
        var topNavHeight = topNav === '' ? 50 : topNav.clientHeight;
        // default 50px
        var elNewHeight = htmlHeight - topNavHeight;
        elem.style.height = elNewHeight + 'px';
      }  //setElHeight
    };  //setHeight
  };
  angular.module('customCore').factory('setHeightAftrTopNav', [setHeightAftrTopNav]);
}());/*(function(lodash) {
  'use strict';

  var _ = lodash;

  var windowResize = function(){

    // ----- Mediator ----- //

    var subscribers = [];

    // guid generator
    function guidGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };

      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    // on resize fire callback fns
    var subscribe = function(fn) {
      var Subscriber = function(fn) {
        this.guid = guidGenerator();
        this.fn = fn;
      };
      var sub = new Subscriber(fn);
      subscribers.push(sub);
      // subscribers.push({context : this , callback : fn, guid : guid});
      return sub.guid;
    };

    var unsubscribe = function(guid) {
      var index = _.findIndex(subscribers, guid);
      subscribers.splice(index, 1);
      return subscribers;
      // return subscribers.indexOf(sub[guid]);
    };

    var getSubscribers = function() {
      return subscribers;
    };


    var actions = {
      subscribe : subscribe,
      unsubscribe : unsubscribe,
      getSubscribers : getSubscribers
    };

    return actions;

  };

  // can use set and get / remove methods here with add and remove listeners


  angular.module('customCore').service('windowResize', [windowResize]);

}(window._));*/
'use strict';
(function () {
  var config = function ($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      resolve: {
        getSummariesOneRes: [
          'getSummaries',
          function (getSummaries) {
            return getSummaries.get();
          }
        ],
        getRunRes: [
          'getRuns',
          function (getRuns) {
            return getRuns.get();
          }
        ],
        getSummariesFormattedOneRes: [
          'getSummaries',
          'formatSummaries',
          function (getSummaries, formatSummaries) {
            var queryOptions = { limit: 1 };
            // format the summs for the table directive
            // - directive needs to know number of markers etc
            var formattedSumms = getSummaries.get(queryOptions).then(function (d) {
                return formatSummaries(d);
              });
            return formattedSumms;
          }
        ]
      },
      views: {
        '': { templateUrl: 'modules/dashboard/views/dashboard.client.view.html' },
        'chartLine@dashboard': {
          templateUrl: 'modules/dashboard/views/dashboard-chart-line.client.view.html',
          controller: 'DashboardChartlineCtrl'
        },
        'summary@dashboard': {
          templateUrl: 'modules/runs/views/run-table.client.view.html',
          controller: 'DashboardSummCtrl'
        }
      }
    });
  };
  // config
  angular.module('dashboard').config([
    '$stateProvider',
    config
  ]);
}());'use strict';
(function () {
  function DashboardChartlineCtrl($scope, getRunRes, getSummariesOneRes) {
    // Add altitude chart
    if (Array.isArray(getRunRes[0].features)) {
      getRunRes[0].features.forEach(function (feature) {
        var runCoords = feature.geometry.coordinates;
        // linestring - only one set of data
        if (typeof runCoords[0][0] === 'number') {
          $scope.run = [runCoords];
        }  // MultiLine string - multiple sets of data
        else {
          $scope.run = runCoords;
        }
      });  //getRunRes[0].features.forEach
    }
    // console.log(getSummariesOneRes);
    var summary = {};
    summary.runs = getSummariesOneRes[0];
    summary.runs.longestMarkerTime = function () {
      return _.max(getSummariesOneRes.markerItems.totalTime);
    };
    summary.runs.shortestMarkerTime = function () {
      return _.min(getSummariesOneRes.markerItems.totalTime);
    };
    $scope.summ = summary;
  }
  angular.module('dashboard').controller('DashboardChartlineCtrl', [
    '$scope',
    'getRunRes',
    'getSummariesOneRes',
    DashboardChartlineCtrl
  ]);
}());// 'use strict';
// (function() {
//   function DashboardMapCtrl($scope, getRunRes, getSummariesOneRes, createGmap) {
//     var run = getRunRes;
//     var summaries = getSummariesOneRes;
//     // console.log(run[0].features[0].geometry.coordinates);
//     // console.log(summaries[0].markerItems);
//     $scope.gMap = createGmap(run[0].features[0].geometry.coordinates, summaries[0].markerItems);
//     // console.log($scope.gmap);
//   }
//   angular.module('dashboard').controller('DashboardMapCtrl', ['$scope', 'getRunRes', 'getSummariesOneRes', 'createGmap', DashboardMapCtrl]);
// })();
'use strict';
(function () {
  function DashboardSummCtrl($scope, getSummariesFormattedOneRes) {
    $scope.tableSortable = false;
    $scope.runs = getSummariesFormattedOneRes;
  }
  angular.module('dashboard').controller('DashboardSummCtrl', [
    '$scope',
    'getSummariesFormattedOneRes',
    DashboardSummCtrl
  ]);
}());'use strict';
(function () {
  var addListItem = function () {
    return function addListItem(options) {
      var li = document.createElement('li');
      var anchor;
      var listItem = {
          anchorElement: null,
          textContent: null,
          className: null,
          parentListElement: null,
          attributes: null
        };
      if (options) {
        listItem.anchorElement = options.anchorElement ? options.anchorElement : null;
        listItem.textContent = options.textContent ? options.textContent : null;
        listItem.classNm = options.classNm ? options.classNm : null;
        listItem.parentListElement = options.parentListElement ? options.parentListElement : null;
        listItem.attributes = options.attributes ? options.attributes : null;
      }
      if (listItem.anchorElement) {
        anchor = document.createElement('a');
        listItem.anchorElement.textContent ? anchor.textContent = listItem.anchorElement.textContent : '';
        li.appendChild(anchor);
      }
      if (listItem.classNm) {
        li.className = listItem.classNm;
      }
      if (listItem.attributes) {
        //test if array
        listItem.attributes.forEach(function (attr) {
          li.setAttribute(attr.name, attr.value);
        });
      }
      listItem.parentListElement.appendChild(li);
    };  // return
  };
  // var addListItem
  angular.module('data-selector').factory('addListItem', [addListItem]);
}());'use strict';
(function (leaflet, lodash) {
  var L = leaflet;
  var _ = lodash;
  var leafletMap = function (setLeafletMapPolylines, createLeafletMap) {
    return {
      restrict: 'AE',
      replace: false,
      link: function (scope, elem, attr) {
        var mapData = scope.LMap;
        var iconClass = 'leaflet-map__marker-icons';
        var currentLayerGroup = null;
        scope.mapContainer = L.map(elem[0], {});
        scope.setMapData = setMapData;
        scope.mapHasLayer = function (layer) {
          return scope.mapContainer.hasLayer(layer);
        };
        scope.getCurrentLayerGroup = function () {
          return currentLayerGroup;
        };
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy;',
          maxZoom: 18
        }).addTo(scope.mapContainer);
        function setMapData(mapData) {
          var bounds;
          var polylines;
          var markers;
          if (currentLayerGroup !== null) {
            scope.mapContainer.removeLayer(currentLayerGroup);
          }
          bounds = setBounds(mapData);
          scope.mapContainer.fitBounds(bounds, {
            padding: [
              20,
              20
            ]
          });
          polylines = setPolylines(mapData);
          markers = setMarkers(mapData);
          currentLayerGroup = L.layerGroup(markers).addLayer(polylines);
          currentLayerGroup.addTo(scope.mapContainer);
        }
        function setBounds(mapData) {
          var boundsMarkers = [];
          boundsMarkers = _.pluck(mapData.markers, 'coords');
          return boundsMarkers;
        }
        function setPolylines(mapData) {
          return L.multiPolyline(mapData.polylines, { color: 'red' });
        }
        function setMarkers(mapData) {
          var mapMarkers = [];
          // add start marker
          mapMarkers.push(createMarkerIcon(mapData.markers[0], 'START', 'leaflet-map__marker-icons--start'));
          // add finish marker
          mapMarkers.push(createMarkerIcon(mapData.markers[1], 'FINISH', 'leaflet-map__marker-icons--finish'));
          // add other markers
          mapData.markers.filter(function (marker, i, arry) {
            return marker.meters > 0;
          }).forEach(function (marker, i) {
            var title = marker.meters / 1000 + ' km';
            mapMarkers.push(createMarkerIcon(marker, title));
          });
          return mapMarkers;
        }
        function createMarkerIcon(marker, title, extraClass) {
          var iconClassNames = extraClass === undefined ? iconClass : iconClass + ' ' + extraClass;
          var customIcon = L.divIcon({
              className: iconClassNames,
              html: '<span>' + title + '</span>'
            });
          marker.options.icon = customIcon;
          return L.marker(marker.coords, marker.options);
        }
        // if map data changes recreate map
        scope.$watch('LMap', createMap);
        function createMap(mapData) {
          setMapData(mapData);
        }
        scope.$on('destroy', function () {
          mapData = null;
          scope.mapContainer = null;
        });
      }  // link
    };
  };
  angular.module('leaflet-maps').directive('leafletMap', [
    'setLeafletMapPolylines',
    'createLeafletMap',
    leafletMap
  ]);
}(window.L, window._));'use strict';
var setLeafletMapMarkers = function setLeafletMapMarkers() {
  return function (runStart, runEnd, summaryMarkerItems) {
    var markers = [];
    // the revealed markers
    var mapMarkerPrototype = {
        id: -1,
        meters: 0,
        coords: null,
        options: {
          clickable: false,
          draggable: false,
          keyboard: false
        }
      };
    // factory pattern for creating map marker items
    var setMarkerItem = function markerItem(options) {
      return angular.extend(Object.create(mapMarkerPrototype), options);
    };
    // Uses the factory and pushes produced marker items to the markers array
    var createMarkerItem = function (markers, setMarkerItem) {
        var markerCounter = 0;
        return function (options) {
          var aMarker;
          options.id = markerCounter;
          aMarker = setMarkerItem(options);
          markers.push(aMarker);
          markerCounter = +1;
          return aMarker;
        };
      }(markers, setMarkerItem);
    // sets all map markers
    setMarkers(runStart, runEnd, summaryMarkerItems, createMarkerItem);
    return markers;
    // requires createMarkerItem()
    function setStartnEndMarkers(runStart, runEnd, createMarkerItem) {
      var starter = {
          coords: [
            runStart.latitude,
            runStart.longitude
          ]
        };
      var finish = {
          coords: [
            runEnd.latitude,
            runEnd.longitude
          ]
        };
      createMarkerItem(starter);
      createMarkerItem(finish);
    }
    // ----- Creating map markers using the summaries ----- //
    // params: markerItems An array of items to be made into markers
    function createMarkers(summaryMarkerItems) {
      summaryMarkerItems.forEach(function (markerItem) {
        var marker = {};
        marker.coords = [
          markerItem.coords.latitude,
          markerItem.coords.longitude
        ];
        marker.meters = markerItem.km * 1000;
        createMarkerItem(marker);
      });
    }
    // requires setStartnEndMarkers(), createMarkers()
    function setMarkers(runStart, runEnd, summaryMarkers, createMarkerItem) {
      setStartnEndMarkers(runStart, runEnd, createMarkerItem);
      createMarkers(summaryMarkers);
    }
  };  // returned function
};
// setMapMarkers
angular.module('leaflet-maps').factory('setLeafletMapMarkers', [setLeafletMapMarkers]);'use strict';
(function () {
  var setLeafletMapPolylines = function () {
    return function setMapPolylines(coordinates) {
      var polylines = [];
      if (typeof coordinates[0][0] === 'number') {
        setPolylines(coordinates);
      } else {
        coordinates.forEach(setPolylines);
      }
      function setPolylines(coords) {
        var newPolyline = [];
        var newCoord;
        coords.map(function (data) {
          newCoord = [
            data[1],
            data[0]
          ];
          newPolyline.push(newCoord);
        });
        polylines.push(newPolyline);
      }
      return polylines;
    };
  };
  angular.module('leaflet-maps').factory('setLeafletMapPolylines', [setLeafletMapPolylines]);
}());'use strict';
// activityData is used for markers start and end and also for the polylines
// summary is used for markers
var createLeafletMap = function createLeafletMap(setLeafletMapPolylines, setLeafletMapMarkers) {
  return function (activityData, summaryMarkerItems) {
    var polylines;
    var markers;
    var paths = [];
    // coords object used by both polylines and markers - for start, end
    var activityStartCoords;
    // coords used for markers
    var activityEndCoords;
    // coords used for markers
    var zoom = 13;
    polylines = setLeafletMapPolylines(activityData);
    setStartnEnd(polylines.length);
    // sets activityStartCoords and activityEndCoords
    function setStartnEnd(numPaths) {
      var last;
      if (polylines[0][0] !== 'undefined') {
        activityStartCoords = {
          'latitude': polylines[0][0][0],
          'longitude': polylines[0][0][1]
        };
        if (numPaths !== 'undefined') {
          last = polylines[numPaths - 1].length - 1;
          activityEndCoords = {
            'latitude': polylines[numPaths - 1][last][0],
            'longitude': polylines[numPaths - 1][last][1]
          };
        }
      }
    }
    markers = setLeafletMapMarkers(activityStartCoords, activityEndCoords, summaryMarkerItems);
    var leafletMap = {
        polylines: polylines,
        markers: markers,
        zoom: zoom
      };
    return leafletMap;
  };
};
angular.module('leaflet-maps').factory('createLeafletMap', [
  'setLeafletMapPolylines',
  'setLeafletMapMarkers',
  createLeafletMap
]);(function (lodash) {
  'use strict';
  var _ = lodash;
  var mediator = function (windowResize) {
    // ----- Topics ----- //
    var topics = {};
    var topicPrototype = { subscribers: [] };
    var topicFactory = function topicFactory(newTopic) {
      return angular.extend(topicPrototype, newTopic);
    };
    var addTopic = function addTopic(name, options) {
      if (!(topics[name] instanceof Object)) {
        var aTopic = topicFactory(options);
        topics[name] = aTopic;
      }
    };
    // Initiate our topics from the passed in services
    // note just move the slice number up if need other services
    // which are not topics
    var eventTopics = [].slice.call(arguments, 0);
    (function () {
      eventTopics.forEach(function (topic) {
        addTopic(topic.name, topic);
      });
    }());
    // ----- END Topics ----- //
    // test
    // addTopic('windowResize', windowResize);
    // ----- Add / remove subs to topics ----- //
    var addSubToTopic = function addSubToTopic(topic, sub) {
      var activeListener;
      if (topics[topic] instanceof Object) {
        topics[topic].subscribers.push(sub);
        var addListener = function (fn, context) {
          var callback = function () {
            fn.call(context);
          };
          var listener = topics[topic].addListener(callback);
          return listener;
        };
        activeListener = addListener(sub.fn, sub.context);
      } else {
        console.log('NO TOPIC OF THAT DESCRIPTION');
      }
      return activeListener;
    };
    var rmSubFromTopic = function rmSubFromTopic(atopic, guid) {
      var topic = topics[atopic];
      var ind = _.findIndex(topic.subscribers, { 'guid': guid });
      topic.subscribers.splice(ind, 1);  // remove sub
    };
    // guid generator
    function guidGenerator() {
      var S4 = function () {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      };
      return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    }
    var subscribe = function (topic, fn, context) {
      var Subscriber = function (topic, fn, context) {
        this.guid = guidGenerator();
        this.topic = topic;
        this.fn = fn;
        this.context = context;
      };
      var sub = new Subscriber(topic, fn, context);
      sub.activeListener = addSubToTopic(sub.topic, sub);
      return sub;
    };
    var getSubscribers = function getSubscribers(topic) {
      var subs = [];
      if (topics[topic] instanceof Object) {
        subs = topics[topic].subscribers;
      }
      return subs;
    };
    var unsubscribe = function (sub) {
      if (topics[sub.topic] instanceof Object) {
        var topic = topics[sub.topic];
        topic.removeListener(sub.activeListener);
        rmSubFromTopic(sub.topic, sub.guid);
      } else {
        console.log('event / topic does not exist');
      }
    };
    var actions = {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        getSubscribers: getSubscribers
      };
    return actions;
  };
  angular.module('mediator').service('mediator', [
    'windowResize',
    mediator
  ]);
}(window._));// Window resize
(function (lodash) {
  'use strict';
  var _ = lodash;
  var windowResize = function windowResize() {
    var registerTopic = {
        name: 'windowResize',
        addListener: function (callback) {
          var action = function (callback) {
              return _.debounce(callback, 150);
            }(callback);
          window.addEventListener('resize', action);
          return action;
        },
        removeListener: function (action) {
          window.removeEventListener('resize', action);
        }
      };
    // registerTopic
    return registerTopic;  // returns a reference to the active listener - to remove later
  };
  // windowResize
  angular.module('mediator').service('windowResize', [windowResize]);
}(window._));'use strict';
// Setting up route
angular.module('runs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Runs state routing
    $stateProvider.state('tableRuns', {
      url: '/runs/table',
      resolve: {
        getSummariesTenRes: [
          'getSummaries',
          'formatSummaries',
          function (getSummaries, formatSummaries) {
            var queryOptions = { limit: 10 };
            // format the summs for the table directive
            // - directive needs to know number of markers etc
            var formattedSumms = getSummaries.get(queryOptions).then(function (d) {
                return formatSummaries(d);
              });
            return formattedSumms;
          }
        ]
      },
      templateUrl: 'modules/runs/views/run-table.client.view.html',
      controller: 'TableRunsCtrl'
    }).state('mapRuns', {
      url: '/runs/map',
      resolve: {
        getRunRes: [
          'getRuns',
          function (getRuns) {
            return getRuns.get();
          }
        ],
        getSummariesFiveRes: [
          'getSummaries',
          function (getSummaries) {
            var queryOptions = { limit: 5 };
            return getSummaries.get(queryOptions);
          }
        ]
      },
      views: {
        '': { templateUrl: 'modules/runs/views/run.client.view.html' },
        'columnOne@mapRuns': {
          templateUrl: 'modules/runs/views/run-map-summary.client.view.html',
          controller: 'MapSummaryCtrl'
        },
        'columnTwo@mapRuns': {
          templateUrl: 'modules/leaflet-maps/views/leaflet-map.client.view.html',
          controller: 'MyMapsCtrl'
        }
      }
    });
  }
]);'use strict';
(function () {
  function MapSummaryCtrl($scope, getSummariesFiveRes, dateFilter) {
    // adding for map dataselector directive
    $scope.summs = getSummariesFiveRes;
    var latestFive = getSummariesFiveRes;
    $scope.summaries = [];
    $scope.setLatestSummaries = setLatestSummaries;
    $scope.setLatestSummaries(latestFive);
    function setLatestSummaries(latestSumms) {
      latestSumms.forEach(function (summary, index) {
        var summ = {
            listOrder: index,
            activityId: summary.runId,
            date: dateFilter(summary.startTime, 'MMM d, y h:mm a'),
            totalTime: dateFilter(summary.totalTime, 'H:m:s'),
            totalDistanceKm: summary.totalDistanceKm.toFixed(2)
          };
        $scope.summaries.push(summ);
      });
    }
  }
  angular.module('runs').controller('MapSummaryCtrl', [
    '$scope',
    'getSummariesFiveRes',
    'dateFilter',
    MapSummaryCtrl
  ]);
}());'use strict';
(function (leaflet) {
  var L = leaflet;
  // Maps controller
  function MyMapsCtrl($rootScope, $scope, $q, getRunRes, getSummariesFiveRes, createLeafletMap, getRunById) {
    var run = getRunRes;
    var coordinates = run[0].features[0].geometry.coordinates;
    var summaries = getSummariesFiveRes;
    var mapData = [];
    $scope.LMap = null;
    // ----- Create new map ----- //
    mapData[0] = createLeafletMap(coordinates, summaries[0].markerItems);
    // sets the map that the Leaflet map directive uses
    $scope.LMap = mapData[0];
    // @returns a new map
    $scope.getNewMap = function getNewMap(id, orderNum) {
      var selectedRun = getRunById.get(id);
      var newMap;
      var deferred = $q.defer();
      selectedRun.then(function (run) {
        var selectedRunCoords = run[0].features[0].geometry.coordinates;
        newMap = createLeafletMap(selectedRunCoords, summaries[orderNum].markerItems);
        deferred.resolve(newMap);
      });
      return deferred.promise;
    };
    $scope.changeMap = function changeMap(event, info) {
      if (!mapData[info.listOrder]) {
        $scope.getNewMap(info.activityId, info.listOrder).then(function (map) {
          mapData[info.listOrder] = map;
          $scope.LMap = mapData[info.listOrder];
        });
      } else {
        $scope.LMap = mapData[info.listOrder];
        $scope.$digest();
      }
      $rootScope.$digest();
    };
    $scope.$on('summarySelected', $scope.changeMap);
    $scope.$on('destroy', function () {
      mapData = [];
    });
  }
  // MyMapsCtrl
  angular.module('runs').controller('MyMapsCtrl', [
    '$rootScope',
    '$scope',
    '$q',
    'getRunRes',
    'getSummariesFiveRes',
    'createLeafletMap',
    'getRunById',
    MyMapsCtrl
  ]);
}(window.L));'use strict';
(function () {
  // table of runs
  function TableRunsCtrl(getSummariesTenRes, $scope) {
    $scope.runs = getSummariesTenRes;
  }
  angular.module('runs').controller('TableRunsCtrl', [
    'getSummariesTenRes',
    '$scope',
    TableRunsCtrl
  ]);
}());'use strict';
(function () {
  var mapDataSelector = function mapDataSelector($window, $rootScope, dateFilter, addListItem, setHeightAftrTopNav, mediator) {
    return {
      restrict: 'AE',
      replace: 'true',
      template: '<div class="dataselector hidden-lg"></div>',
      link: function (scope, elem, attr) {
        var data = scope.summs;
        var prevTargetEl;
        // The list of runs from which you can select to show on chart
        var dataSelectorList = document.createElement('ul');
        // add Select All item
        var listItemSelectRun = {
            parentListElement: dataSelectorList,
            anchorElement: { textContent: 'Select a run' },
            classNm: 'select-run'
          };
        addListItem(listItemSelectRun);
        // Add all of the data selector list items to chartDataSelectorList
        data.forEach(function (d, index, array) {
          var inactiveClass = index === 0 ? '' : 'inactive';
          var selectorListItem = {
              parentListElement: dataSelectorList,
              anchorElement: { textContent: dateFilter(d.startTime, 'medium') },
              classNm: inactiveClass,
              attributes: [
                {
                  name: 'data-activity-id',
                  value: d.runId
                },
                {
                  name: 'data-list-order',
                  value: index
                }
              ]
            };
          addListItem(selectorListItem);
        });
        elem.append(dataSelectorList);
        elem.on('click', function (e) {
          var targetEl = e.target;
          var activityId = '';
          var listOrder = 0;
          toggleVals(targetEl);
          function toggleVals(targetEl) {
            if (targetEl.nodeName.toLowerCase() !== 'li') {
              toggleVals(targetEl.parentNode);
            } else {
              activityId = targetEl.getAttribute('data-activity-id') || '';
              listOrder = targetEl.getAttribute('data-list-order');
              targetEl.classList.toggle('inactive');
              if (!prevTargetEl) {
                // set initial prevTargetEl to first run in list
                prevTargetEl = elem.find('li')[1];
              }
              prevTargetEl.classList.toggle('inactive');
              prevTargetEl = targetEl;
            }
          }
          $rootScope.$broadcast('summarySelected', {
            'activityId': activityId,
            'listOrder': listOrder
          });
        });
        // ----- set the height for scrolling ----- //
        setHeightAftrTopNav(elem[0]);
        // ----- add event listener on window resize ----- //
        var resetHeight = function resetHeight() {
          var element = elem[0];
          setHeightAftrTopNav(element);
        };
        var resizeEvent = mediator.subscribe('windowResize', resetHeight, this);
        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function () {
          mediator.unsubscribe(resizeEvent);
        });
      }  // link
    };  // returned object
  };
  // mapDataSelector
  angular.module('runs').directive('mapDataSelector', [
    '$window',
    '$rootScope',
    'dateFilter',
    'addListItem',
    'setHeightAftrTopNav',
    'mediator',
    mapDataSelector
  ]);
}());'use strict';
var mapSummaries = function ($rootScope) {
  return {
    restrict: 'A',
    link: function postLink(scope, elem, attr) {
      var prevTargetEl;
      scope.changeActiveMap = function changeActiveMap(e) {
        var divEl = e.target;
        var activityId = '';
        var listOrder = 0;
        getAttr();
        function getAttr() {
          if (divEl.nodeName !== 'DIV') {
            divEl = e.target.parentNode;
            getAttr();
          } else {
            activityId = divEl.getAttribute('data-activity-id') || '';
            listOrder = divEl.getAttribute('data-list-order');
            if (!prevTargetEl) {
              var firstSumm = divEl.parentNode.querySelector('div.mapSummaryItem');
              prevTargetEl = firstSumm;
            }
            prevTargetEl.classList.remove('active');
            prevTargetEl = divEl;
            divEl.classList.add('active');
          }
        }
        // getAttr
        // This will trigger a change of the map to the selected run
        $rootScope.$broadcast('summarySelected', {
          'activityId': activityId,
          'listOrder': listOrder
        });
      };
      // add an event listener to trigger change of map
      elem.on('click', scope.changeActiveMap);
    }
  };  // returned object
};
// mapSummaries
angular.module('runs').directive('mapSummaries', [
  '$rootScope',
  mapSummaries
]);'use strict';
(function (lodash, sorttable) {
  var _ = lodash;
  var runsSummaryTable = function runsSummaryTable($filter) {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        var runs = scope.runs;
        var sortable = scope.tableSortable !== undefined ? scope.tableSortable : true;
        // Makes sure the runs are sorted by date initially
        var runsSorted = _.sortBy(runs.runs, 'startTime').reverse();
        runs.runs = runsSorted;
        // creates placeholder container
        var docFragment = document.createDocumentFragment();
        var tableOfRuns = createTableOfRuns(runs, sortable);
        // layout our table.
        function createTableOfRuns(runs, sortable) {
          var table = document.createElement('table');
          // note sortable class added for sorttable.js
          if (sortable) {
            table.className = 'table sortable';
          } else {
            table.className = 'table';
          }
          var thead = document.createElement('thead');
          var headingRow;
          var tableHeadings;
          var tableData;
          var markerSize;
          var headings = {
              date: 'Date',
              markers: 0,
              totalDistance: 'Distance',
              totalTime: 'Time'
            };
          // amends headings.markers to get highest number of markers
          getMarkerSize(runs, headings);
          markerSize = headings.markers;
          // headingRow = document.createDocumentFragment();
          headingRow = document.createElement('tr');
          tableHeadings = createTableHeadings(headings, headingRow);
          thead.appendChild(headingRow);
          table.appendChild(thead);
          tableData = createTableData(runs, markerSize, $filter);
          table.appendChild(tableData);
          return table;
          function getMarkerSize(runs, headings) {
            var markerSize = _.max(runs.markerSize);
            headings.markers = markerSize;
          }
          function createTableHeadings(headings, headingRow) {
            for (var heading in headings) {
              if (headings.hasOwnProperty(heading)) {
                var container = document.createDocumentFragment();
                if (heading === 'markers') {
                  var markerSize = headings[heading];
                  for (var i = 1; i <= markerSize; i++) {
                    var thd = document.createElement('th');
                    var km = document.createTextNode('km ' + i);
                    thd.appendChild(km);
                    container.appendChild(thd);
                  }
                } else {
                  var thd2 = document.createElement('th');
                  thd2.appendChild(document.createTextNode(headings[heading]));
                  container.appendChild(thd2);
                }
                headingRow.appendChild(container);
              }
            }
            return headingRow;
          }
          function createTableData(runs, markersSize, $filter) {
            var markerSize = markersSize;
            var container = document.createElement('tbody');
            runs.runs.forEach(function (run) {
              var tr = document.createElement('tr');
              var tdStartTime = document.createElement('td');
              // use filter to change timestamp to time
              var sTime = $filter('date')(run.startTime, 'EEE MMM d, y h:mma');
              tdStartTime.appendChild(document.createTextNode(sTime));
              // use sortable custom key attribute for sorttable.js
              var attTime = $filter('date')(run.startTime, 'yyyyMMddHHmm');
              tdStartTime.setAttribute('sorttable_customkey', attTime);
              tr.appendChild(tdStartTime);
              for (var i = 0; i < markerSize; i++) {
                var td = document.createElement('td');
                var markerTime;
                var data;
                if (run.markers[i]) {
                  markerTime = run.markers[i].time;
                  data = $filter('date')(markerTime, 'm:ss');
                } else {
                  data = '';
                }
                td.appendChild(document.createTextNode(data));
                tr.appendChild(td);
              }
              var tdTotalDist = document.createElement('td');
              var dist = run.totalDistance.toFixed(2);
              tdTotalDist.appendChild(document.createTextNode(dist));
              tr.appendChild(tdTotalDist);
              var tdTotalTime = document.createElement('td');
              var time = $filter('date')(run.totalTime, 'HH:mm:ss');
              tdTotalTime.appendChild(document.createTextNode(time));
              tr.appendChild(tdTotalTime);
              container.appendChild(tr);
            });
            return container;
          }
        }
        element.append(tableOfRuns);
        // add the sorttable.js initiation
        var table = document.querySelector('table.sortable') || '';
        if (table !== '') {
          sorttable.makeSortable(table);
        }
      }  // link
    };
  };
  angular.module('runs').directive('runsSummaryTable', [
    '$filter',
    runsSummaryTable
  ]);
}(window._, window.sorttable));'use strict';
(function () {
  var formatSummaries = function ($q) {
    return function formatSummaries(runs) {
      var deferred = $q.defer();
      var runsData = {
          runs: [],
          markerSize: [],
          longestMarkerTime: 0,
          shortestMarkerTime: 0
        };
      runs.forEach(function (run) {
        var markersLen;
        var runData = {};
        runData.markers = [];
        markersLen = run.markerItems.length;
        runsData.markerSize.push(markersLen);
        runData.startTime = run.startTime;
        run.markerItems.forEach(function (marker) {
          if (runsData.shortestMarkerTime === 0) {
            runsData.shortestMarkerTime = marker.totalTime;
          } else {
            if (marker.totalTime < runsData.shortestMarkerTime) {
              runsData.shortestMarkerTime = marker.totalTime;
            }
          }
          if (marker.totalTime > runsData.longestMarkerTime) {
            runsData.longestMarkerTime = marker.totalTime;
          }
          var markerData = {
              km: marker.km,
              time: marker.totalTime
            };
          runData.markers.push(markerData);
        });
        runData.totalDistance = run.totalDistanceKm;
        runData.totalTime = run.totalTime;
        runsData.runs.push(runData);
      });
      deferred.resolve(runsData);
      return deferred.promise;
    };  //createDataOb
  };
  angular.module('runs').factory('formatSummaries', [
    '$q',
    formatSummaries
  ]);
}());'use strict';
// returns a run by id
(function () {
  var getRunById = function ($resource, Authentication) {
    var runs = {
        resource: $resource('/api/v_' + ApplicationConfiguration.apiVersion + '/:user_id/run/data/:run_id', {
          'user_id': '@user_id',
          'run_id': '@run_id'
        }, {
          query: {
            method: 'GET',
            isArray: true
          },
          create: { method: 'POST' }
        }),
        get: function get(id) {
          var promise = this.resource.query({
              'user_id': Authentication.user._id,
              'run_id': id
            }).$promise;
          return promise;
        }
      };
    return runs;
  };
  angular.module('runs').factory('getRunById', [
    '$resource',
    'Authentication',
    getRunById
  ]);
}());'use strict';
(function () {
  var getRuns = function getRuns($resource, Authentication) {
    var run = {
        resource: $resource('/api/v_' + ApplicationConfiguration.apiVersion + '/:user_id/run/data', { 'user_id': '@user_id' }),
        get: function get(options) {
          // if (this.data !== null) {
          //   return this.data;
          // }
          // set default options
          var query = {
              limit: 1,
              offset: 0
            };
          if (options) {
            query = {
              limit: options.limit ? options.limit : 1,
              offset: options.offset ? options.offset : 0
            };
          }
          var promise = this.resource.query({
              'user_id': Authentication.user._id,
              'limit': query.limit,
              'offset': query.offset
            }).$promise;
          return promise;  // this.data = result;
                           // return this.data;
        },
        data: null
      };
    return run;
  };
  angular.module('runs').service('getRuns', [
    '$resource',
    'Authentication',
    'formatSummaries',
    getRuns
  ]);
}());'use strict';
// returns a run by id
(function () {
  var getSummariesById = function ($resource, Authentication) {
    var runs = {
        resource: $resource('/api/v_' + ApplicationConfiguration.apiVersion + '/:user_id/run/summaries/:summary_id', {
          'user_id': '@user_id',
          'summary_id': '@summary_id'
        }, {
          query: {
            method: 'GET',
            isArray: true
          },
          create: { method: 'POST' }
        }),
        get: function get(id) {
          var promise = this.resource.query({
              'user_id': Authentication.user._id,
              'summary_id': id
            }).$promise;
          return promise;
        }
      };
    return runs;
  };
  angular.module('runs').factory('getSummariesById', [
    '$resource',
    'Authentication',
    getSummariesById
  ]);
}());'use strict';
(function () {
  var getSummaries = function getSummaries($resource, Authentication) {
    var summary = {
        resource: $resource('/api/v_' + ApplicationConfiguration.apiVersion + '/:user_id/run/summaries', { 'user_id': '@user_id' }),
        get: function get(options) {
          // if (this.data !== null) {
          //   return this.data;
          // }
          // set default options
          var query = {
              limit: 1,
              offset: 0
            };
          if (options) {
            query = {
              limit: options.limit ? options.limit : 1,
              offset: options.offset ? options.offset : 0
            };
          }
          var promise = this.resource.query({
              'user_id': Authentication.user._id,
              'limit': query.limit,
              'offset': query.offset
            }).$promise;
          return promise;  // this.data = result;
                           // return this.data;
        },
        data: null
      };
    return summary;
  };
  angular.module('runs').service('getSummaries', [
    '$resource',
    'Authentication',
    getSummaries
  ]);
}());'use strict';
(function () {
  var SideNavGroupController = function SideNavGroupController($scope) {
    $scope.hasIcon = angular.isDefined($scope.icon);
    $scope.hasSubMenu = angular.isDefined($scope.hasChildren);
  };
  angular.module('left-nav').controller('SideNavGroupController', [
    '$scope',
    SideNavGroupController
  ]);
}());'use strict';
(function () {
  var SideNavItemController = function SideNavItemController($scope) {
    $scope.hasIcon = angular.isDefined($scope.icon);
  };
  angular.module('left-nav').controller('SideNavItemController', [
    '$scope',
    SideNavItemController
  ]);
}());'use strict';
(function (lodash) {
  var _ = lodash;
  var SideNavController = function SideNavController($scope, Authentication) {
    // $scope.authentication is used to determine when to show signout / signin
    $scope.authentication = Authentication;
  };
  angular.module('left-nav').controller('SideNavController', [
    '$scope',
    'Authentication',
    SideNavController
  ]);
}(window._));'use strict';
(function () {
  var sideNavGroup = function sideNavGroup() {
    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      controller: 'SideNavGroupController',
      scope: {
        title: '@',
        icon: '@',
        iconCaption: '@',
        active: '=?',
        hasChildren: '=?',
        hasChildrenIcon: '@'
      },
      link: function link(scope, element, attrs, parentCtrls) {
        // ----- Set event listener to toggle view for child elements -----//
        var anchor = element.children()[0];
        var angAnchor = angular.element(anchor);
        angAnchor.on('click', function (event) {
          element.toggleClass('open');
        });
      },
      template: '<li data-ng-class="{ active : active, hasChildren : hasChildren }">' + '<a href="">' + '<span data-ng-if="hasIcon" class="icon {{ icon }}"><em data-ng-if="hasIconCaption"> {{ iconCaption }} </em></span>' + '<span class="navTitle">{{ title }}</span>' + '<span class="icon toggleIcon {{ hasChildrenIcon }}"></span>' + '</a>' + '<ul data-ng-transclude=""></ul>' + '</li>'
    };
  };
  angular.module('left-nav').directive('sideNavGroup', sideNavGroup);
}());'use strict';
(function () {
  var sideNavItem = function sideNavItem() {
    return {
      require: ['^sideNav'],
      restrict: 'AE',
      replace: true,
      transclude: true,
      controller: 'SideNavItemController',
      scope: {
        title: '@',
        view: '@',
        icon: '@',
        iconCaption: '@',
        href: '@',
        target: '@'
      },
      link: function (scope, element, attrs, parentCtrls) {
        var navCtrl = parentCtrls[0];
        var navgroupCtrl = parentCtrls[1];
      },
      template: '<li>' + '<a ui-sref="{{ view }}" title="{{ title }}">' + '<span data-ng-if="hasIcon" class="icon {{ icon }}"><em data-ng-if="hasIconCaption"> {{ iconCaption }}</em></span>' + '<span class="navTitle">{{ title }}</span>' + '<span data-ng-transclude=""></span>' + '</a>' + '</li>'
    };
  };
  angular.module('left-nav').directive('sideNavItem', sideNavItem);
}());'use strict';
(function () {
  var sideNavContainer = function (Authentication) {
    return {
      restrict: 'AE',
      replace: false,
      link: function link(scope, elem, attr) {
        // Only show side nav when signed in
        scope.Authentication = Authentication;
      }
    };
  };
  angular.module('left-nav').directive('sideNavContainer', [
    'Authentication',
    sideNavContainer
  ]);
}());(function () {
  var sideNav = function sideNav($location, setHeightAftrTopNav, mediator) {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<nav><ul data-ng-transclude=""></ul></nav>',
      controller: 'SideNavController',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) {
            var mediaQuery = window.matchMedia('(max-width: 768px)');
            var bod = document.querySelector('body');
            // Add active state to nav element that matches new state
            // & remove active class for previous active nav element
            scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
              if (fromState.name !== '') {
                // remove the li with active
                if (document.querySelector('.left-nav li.active')) {
                  var prevEl = document.querySelector('.left-nav li.active');
                  prevEl.classList.remove('active');
                }
              }
              // Add active class to li
              if (document.querySelector('#left-nav-js [ui-sref="' + toState.name + '"]')) {
                var newEl = document.querySelector('#left-nav-js [ui-sref="' + toState.name + '"]').parentNode;
                newEl.classList.add('active');
              }
            });
            scope.closeMenu = function closeMenu(event) {
              console.log(event.target.textContent.toLowerCase());
              if (mediaQuery.matches && event.target.textContent.toLowerCase() !== 'charts') {
                bod.classList.toggle('leftNav--toggle');
              }
            };
            // toggle menu. When a nav item is selected. For smaller than desktop
            iElement.on('click', scope.closeMenu);
            // ----- set the height for scrolling ----- //
            setHeightAftrTopNav(iElement[0].parentElement);
            // ----- add event listener on window resize ----- //
            // adding to scope for testability
            scope.resetHeight = function resetHeight() {
              var element = iElement[0].parentElement;
              setHeightAftrTopNav(element);
            };
            var resizeEvent = mediator.subscribe('windowResize', scope.resetHeight, this);
            // ----- remove event listener when scope is destroyed ----- //
            scope.$on('$destroy', function () {
              mediator.unsubscribe(resizeEvent);
            });
          }  // post
        };  // returned object
      }
    };  // returned object
  };
  // sideNav
  angular.module('left-nav').directive('sideNav', [
    '$location',
    'setHeightAftrTopNav',
    'mediator',
    sideNav
  ]);
}());'use strict';
(function () {
  var topNavToggleChartData = function topNavToggleChartData() {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attr, ctrl) {
        var dataSelector = element.attr('data-data-selector');
        var chartList;
        var click = element.on('click', toggleMenu);
        var bod = document.querySelector('body');
        var matchMedia = window.matchMedia('min-width: 1200px');
        var toggleDataSelector = function (dataSelectorId) {
            var dataSelector = dataSelectorId;
            return function toggleDataSelector(event) {
              event.preventDefault();
              bod.classList.toggle('dataselector-list-' + dataSelector + '--open');
            };
          }(dataSelector);
        function toggleMenu(event) {
          chartList = document.querySelector('#dataselector-list-js');
          event.preventDefault();
          chartList.classList.toggle('inactive');
          element.toggleClass('open');
        }
        element.on('click', function (event) {
          toggleDataSelector(event);
        });
        // ----- remove event listener when scope is destroyed ----- //
        scope.$on('$destroy', function () {
          click();
          chartList = null;
        });
      }  // link
    };
  };
  angular.module('top-nav').directive('topNavToggleChartData', [topNavToggleChartData]);
}());'use strict';
(function () {
  var topNavMenuIcon = function topNavMenuIcon(Authentication) {
    return {
      restrict: 'A',
      link: function postLink(scope, el, attr, ctrl) {
        var bod = document.querySelector('body');
        scope.authentication = Authentication;
        el.on('click', toggleMenu);
        function toggleMenu(event) {
          event.preventDefault();
          bod.classList.toggle('leftNav--toggle');
        }
      }
    };
  };
  angular.module('top-nav').directive('topNavMenuIcon', [
    'Authentication',
    topNavMenuIcon
  ]);
}());'use strict';
/*
 * Decorator for Angular File Upload service
 * Adds functionality to check the suffix of a file
 * $upload: a service from Angular file upload,
 * $delegate: the original service (in this case $upload) which is returned
 *  with the added functionality
 */
angular.module('upload-data').config([
  '$provide',
  function ($provide) {
    $provide.decorator('$upload', function ($delegate) {
      $delegate.checkSuffix = function checkSuffix(suffix, name) {
        var testSuffix = new RegExp('.' + suffix);
        return testSuffix.test(name.slice(-4));  // true / false
      };
      return $delegate;
    });
  }
]);'use strict';
// Setting up route
angular.module('upload-data').config([
  '$stateProvider',
  function ($stateProvider) {
    // Runs state routing
    $stateProvider.state('upload', {
      url: '/upload/gpx',
      templateUrl: 'modules/upload-data/views/upload-data.client.view.html',
      controller: 'UploadDataCtrl'
    });
  }
]);(function () {
  'use strict';
  /*
 * Upload a file to the database
 * Params: upload data service
 */
  var UploadDataCtrl = function UploadDataCtrl($scope, upload) {
    $scope.message = upload.resultsListItems;
    $scope.fileName = 'Choose file';
    $scope.onFileSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        upload.uploadFile(file);
      }  // for loop
    };  // $scope.onFileSelect
  };
  angular.module('upload-data').controller('UploadDataCtrl', [
    '$scope',
    'upload',
    UploadDataCtrl
  ]);
}());(function () {
  'use strict';
  /**
 * @description Watches for new result items and adds them to the DOM
 */
  var uploadResults = function uploadResults($compile) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        function compileMe(toBeCompiled) {
          return $compile(toBeCompiled)(scope);
        }
        scope.$watchCollection('message', function () {
          var num = scope.message.length - 1;
          var newEl = compileMe(scope.message[num]);
          element.prepend(newEl);
        });
      }  // link
    };  // return
  };
  // uploadFileName
  angular.module('upload-data').directive('uploadResults', [
    '$compile',
    uploadResults
  ]);
}());(function () {
  'use strict';
  /**
 * @description : a service that uploads a gpx to the db.
 * @param $upload the decorator used for the angular file upload module.
 * @param $rootScope
 * @returns {Object} upload function and results items
 */
  var uploadData = function uploadData($upload, $rootScope) {
    var uploadSuccess;
    var uploadProgress;
    var upload;
    var resultsListItems = [];
    var uploadDefineVars;
    var uploadFile;
    // define vars dependent on whether web workers are available
    uploadDefineVars = function uploadDefineVars() {
      if (window.Worker instanceof Function) {
        // Send them to the web worker
        uploadSuccess = function uploadSuccess(message) {
          // file is uploaded successfully
          resultsListItems.push('<li class="upload-file__message--success">Successfully uploaded: ' + message.data + '</li>');
          $rootScope.$apply();
        };
        upload = function upload(file) {
          var worker = new Worker('/lib/custom/angular-file-upload-extra/web-worker.js');
          worker.postMessage(file);
          worker.onmessage = uploadSuccess;
        };
      } else {
        // ORIGINAL WAY OF USING ANGULAR FILE UPLOAD
        uploadSuccess = function uploadSuccess(data, status, headers, config) {
          // file is uploaded successfully
          resultsListItems.push('<li">Successfully uploaded: ' + config.file.name + '</li>');
        };
        uploadProgress = function uploadProgress(evt) {
          console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
        };
        upload = function upload(file) {
          // $scope.upload =
          $upload.upload({
            url: '/upload',
            method: 'POST',
            file: file
          }).progress(uploadProgress).success(uploadSuccess);  //.error(...)
                                                               //.then(success, error, progress);
                                                               // access or attach event listeners to the underlying XMLHttpRequest.
                                                               //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        };
      }
    };
    // uploadDefineVars
    uploadDefineVars();
    uploadFile = function (file) {
      // We've added a decorator to check the suffix
      // returns true if suffix is gpx
      var isitGpx = $upload.checkSuffix('gpx', file.name);
      if (isitGpx === false) {
        return resultsListItems.push('<li class="upload-file__message--fail">The file needs to be a gpx : ' + file.name + '</li>');
      }
      upload(file);
    };
    return {
      resultsListItems: resultsListItems,
      uploadFile: uploadFile
    };
  };
  angular.module('upload-data').service('upload', [
    '$upload',
    '$rootScope',
    uploadData
  ]);
}());'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('signout', {
      url: '/auth/one/signout',
      controller: function ($http, $state, $location, $scope, Authentication) {
        $http.get('auth/signout').then(function () {
          $location.url('/');
        });
        Authentication.user = null;
      }
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/upload/gpx');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/welcome');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);